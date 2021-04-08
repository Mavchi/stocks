import requests
from requests.exceptions import HTTPError
from bs4 import BeautifulSoup
from python_settings import settings
import time
import random
import csv
import json
import copy
from db import DB

import env

def getStockQuote(company):
	def parse(company, html: str):
		numbers = '0123456789'
		soup = BeautifulSoup(html.content, 'html.parser')
		#label = soup.select('table tbody tr td span')
		data = soup.select('table tbody tr td')
		for i in range(0, len(data), 2):
			if('Trailing P/E' in data[i].get_text().rstrip(numbers)):
				try :
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
					company['totalCash'] = data[i+1].get_text().rstrip('.')
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
					company['totalDebt'] = data[i+1].get_text().rstrip('.')
					if company['totalDebt'][-1] == 'M':
						company['totalDebt'] = float(company['totalCash'][:-1])
					if company['totalDebt'][-1] == 'B':
						company['totalDebt'] = float(company['totalCash'][:-1])*1000
					elif company['totalDebt'][-1] == 'T':
						company['totalDebt'] = float(company['totalCash'][:-1])*1000000
					else:
						print(f'{company["symbol"]}: totalDebt not B: {company["totalDebt"]}')
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
		response.raise_for_status()
		time.sleep(random.randint(7, 13))
		
		parse(company,response)
		company['sharesOurstanding'] = int(company['marketCap'] / company['lastPrice'])
		company['cPE'] = (company['lastPrice']/company['dEPS'])
		if company['dEPS'] < 0 and company['lastPrice'] < 0:
			company['cPE'] *= -1

		try:
			company['peter'] = company['qEarningsGrowth'] / company['cPE']
		except:
			company['peter'] = ''



if __name__ == '__main__':
	db = DB()
	exit(1)


	companies = []

	with open('raw/nyseMega.csv', 'r') as file:
		reader = csv.reader(file, delimiter=',')
		columnNames = next(reader)
		failed = []

		for data in reader:
			company = {}
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
			}

			try:
				getStockQuote(company)
			except HTTPError as http_err:
				print('Error downloading stock quote: ', company['symbol'])
				print(f'HTTP ERROR OCCURED: {http_err}')
				failed.append(company)
				print(company['symbol'], 'fail')
				continue
			except Exception as err:
				print('Error downloading stock quote: ', company['symbol'])
				print(f'https: // finance.yahoo.com/quote/{company["symbol"]}/key-statistics?p={company["symbol"]}')
				print(f'Other error accured: {err}')
				failed.append(company)
				print(company['symbol'], 'fail')
				continue
				
			companies.append(company)
			#print(company)
	print('Companies that werent downloaded:', len(failed))
	
	i = 500
	while len(failed) > 0:
		i -= 1
		if i < 0:
			break
		indexRemoved = random.randint(0, len(failed)-1)
		try:
			print('trying to download', failed[indexRemoved]['symbol'])
			getStockQuote(failed[indexRemoved])
		except:
			print('Still couldnt download, ', failed[indexRemoved]['symbol'])
			continue
		
		companies.append(copy.deepcopy(failed[indexRemoved]))
		del failed[indexRemoved]
		

	#with open(env.stockObjs, 'w') as file:
	#	json.dump(companies, file)
	

"""
Bugs:

"""
