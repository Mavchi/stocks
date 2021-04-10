from pprint import pprint
import requests
from requests.exceptions import HTTPError
from bs4 import BeautifulSoup
from pymongo import MongoClient
from pprint import pprint
import time
from random import randint
import csv
import json
import copy

import env

class DB:
		def __init__(self):
				self.client = MongoClient(env.mongoDbUrl)
				self.db = self.client.stocks

				self.loadSymbols()

				#stocks = self.db.stocks.find({})
				#for stock in stocks:
				#		pprint(stock)

		def loadSymbols(self):
				companies = []

				with open('raw/nyse.csv') as file:
					reader = csv.reader(file, delimiter=',')
					columnNames = next(reader)
					failed = []

					for data in reader:
						company = {}
						try:
							company = {
								'symbol': data[0],
								'name': data[1],
								'country': data[6],
								'ipoYear': data[7],
								'sector': data[9],
								'industry': data[10],
								'marketCap': float(data[5]),
								'lastPrice': float(data[2].lstrip('$')),
								'category': 'maybe',
								'lastUpdated': 0
							}
						except:
							print(f'{data[0]} has no stock price')
							continue
						companies.append(company)
				
				failed = []
				for i in range(len(companies)):
					result = self.db.stocks.find({'symbol': companies[i]['symbol']})
					# symbol not in db
					if result.count() == 0:
						print(f'{companies[i]["symbol"]} not in db')
						try:
							self.getStockQuote(companies[i])
						except:
							print(f'failed to download {companies[i]["symbol"]}')
							failed.append(companies[i])
							continue
						companies[i]['lastUpdated'] = time.time()
						companies[i]['category'] = 'new'
						try:
							self.db.stocks.insert_one(companies[i])
						except:
							print('mongoDB failure')
							continue
					else:
						last_updated = time.localtime(companies[i]['lastUpdated'])
						print(f'{companies[i]["symbol"]} in db, last updated {last_updated.tm_mday}/{last_updated.tm_mon}/{last_updated.tm_year}')

				"""
				i = 500
				while len(failed) > 0:
					i -= 1
					if i < 0:
						break
					indexRemoved = randint(0, len(failed)-1)
					try:
						print('trying to download', failed[indexRemoved]['symbol'])
						self.getStockQuote(failed[indexRemoved])
						failed[indexRemoved]['lastUpdated'] = time.time()
						failed[indexRemoved]['category'] = 'new'
						self.db.stocks.insert_one(companies[i])
					except:
						print('Still couldnt download, ', failed[indexRemoved]['symbol'])
						continue
					
					companies.append(copy.deepcopy(failed[indexRemoved]))
					del failed[indexRemoved]
				"""

		def getStockQuote(self, company):
			def parse(company, html: str):
				numbers = '0123456789'
				soup = BeautifulSoup(html.content, 'html.parser')
				#label = soup.select('table tbody tr td span')
				data = soup.select('table tbody tr td')
				#print(data)
				for i in range(0, len(data), 2):
					if('Trailing P/E' in data[i].get_text().rstrip(numbers)):
						try:
							company['tPE'] = float(data[i+1].get_text())
						except:
							print(f'{company["symbol"]}: tPE failed')
							company['tPE'] = ''
					elif('% Held by Insiders' in data[i].get_text().rstrip(numbers)):
						try:
							company['insiders'] = float(data[i+1].get_text().rstrip('%'))
						except:
							print(f'{company["symbol"]}: insiders failed')
							company['insiders'] = ''
					elif('% Held by Institutions' in data[i].get_text().rstrip(numbers)):
						try:
							company['institutions'] = float(data[i+1].get_text().rstrip('%'))
						except:
							print(f'{company["symbol"]}: institutions failed')
							company['institutions'] = ''
					elif('Short Ratio' in data[i].get_text().rstrip(numbers)):
						try:
							company['shortRatio'] = float(data[i+1].get_text().rstrip('.'))
						except:
							print(f'{company["symbol"]}: shortRatio failed')
							company['shortRatio'] = ''
					elif('Trailing Annual Dividend Yield' in data[i].get_text().rstrip(numbers)):
						try:
							company['tAnnualDividendYield'] = float(data[i+1].get_text().rstrip('%'))
						except:
							print(f'{company["symbol"]}: tAnnualDividendYield failed')
							company['tAnnualDividendYield'] = ''
					elif('Diluted EPS' in data[i].get_text().rstrip(numbers)):
						try:
							company['dEPS'] = float(data[i+1].get_text().rstrip('.'))
						except:
							print(f'{company["symbol"]}: dEPS failed')
							company['dEPS'] = ''
					elif('Total Cash (mrq)' in data[i].get_text().rstrip(numbers)):
						try:
							company['totalCash'] = data[i+1].get_text()
							continue
							if company['totalCash'][-1] == 'M':
								company['totalCash'] = float(company['totalCash'][:-1])
							if company['totalCash'][-1] == 'B':
								company['totalCash'] = float(company['totalCash'][:-1])*1000
							elif company['totalCash'][-1] == 'T':
								company['totalCash'] = float(company['totalCash'][:-1])*1000000
							else:
								print(f'{company["symbol"]}: totalCash not B: {company["totalCash"]}')
						except:
							print(f'{company["symbol"]}: totalCash failed')
							company['totalCash'] = ''
					elif('Total Cash Per Share' in data[i].get_text().rstrip(numbers)):
						try:
							company['cashPerShare'] = float(data[i+1].get_text().rstrip('.'))
						except:
							print(f'{company["symbol"]}: cashPerShare failed')
							company['cashPerShare'] = ''
					elif('Total Debt (mrq)' in data[i].get_text().rstrip(numbers)):
						try:
							company['totalDebt'] = data[i+1].get_text()
							continue
							if company['totalDebt'][-1] == 'M':
								company['totalDebt'] = float(company['totalCash'][:-1])
							if company['totalDebt'][-1] == 'B':
								company['totalDebt'] = float(company['totalCash'][:-1])*1000
							elif company['totalDebt'][-1] == 'T':
								company['totalDebt'] = float(company['totalCash'][:-1])*1000000
							else:
								print(f'{company["symbol"]}: unknown amount: {company["totalDebt"]}')
						except:
							print(f'{company["symbol"]}: totalDebt failed')
							company['totalDebt'] = ''
					elif('Quarterly Earnings Growth' in data[i].get_text().rstrip(numbers)):
						try:
							company['qEarningsGrowth'] = float(data[i+1].get_text().rstrip('%'))
						except:
							print(f'{company["symbol"]}: qEarningsGrowth failed')
							company['qEarningsGrowth'] = ''
					elif('Profit Margin' in data[i].get_text().rstrip('%')):
						try:
							company['profitMargin'] = float(data[i+1].get_text().rstrip('%'))
						except:
							print(f'{company["symbol"]}: profitMargin failed')
							company['profitMargin'] = ''
					elif('Quarterly Revenue Growth' in data[i].get_text().rstrip(numbers)):
						try:
							company['qRevenueGrowth'] = float(data[i+1].get_text().rstrip('%'))
						except:
							print(f'{company["symbol"]}: qRevenueGrowth failed')
							company['qRevenueGrowth'] = ''
					elif('Enterprise Value' in data[i].get_text().rstrip(numbers)):
						try:
							company['enterpriseValue'] = data[i+1].get_text()
							continue
						except:
							print(f'{company["symbol"]}: Enterprise Value failed')
							company['enterpriseValue'] = ''
				"""
				with open('debug2.txt', 'w') as file:
					for i in range(0, len(data), 2):
						file.write(f'{data[i].get_text().rstrip("0123456789")}: {data[i+1].get_text().rstrip("0123456789")}\n')
					file.close()"""

			baseUrl = f'https://finance.yahoo.com/quote/{company["symbol"]}/key-statistics?p={company["symbol"]}'
			#baseUrl = f'https://finance.yahoo.com/quote/{company['symbol']}?p={company['symbol']}&.tsrc=fin-srch'
			headers = {
								'User-Agent': 'Mozilla/5.0 (X11 Ubuntu Linux x86_64 rv: 87.0) Gecko/20100101 Firefox/87.0',
									'Referer': 'https://www.google.fi',
			}

			with requests.get(baseUrl, headers) as response:
				#response.raise_for_status()
				time.sleep(randint(3, 6))

				parse(company, response)
				company['sharesOurstanding'] = int(company['marketCap'] / company['lastPrice'])
				company['cPE'] = (company['lastPrice']/company['dEPS'])
				if company['dEPS'] < 0 and company['lastPrice'] < 0:
					company['cPE'] *= -1

				try:
					company['peter'] = company['qEarningsGrowth'] / company['cPE']
				except:
					company['peter'] = ''
