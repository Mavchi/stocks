import requests
from requests.exceptions import HTTPError
from bs4 import BeautifulSoup
import time
import random
import csv
import env

def getStockQuote(symbol: str):
	def parse(html: str):
		soup = BeautifulSoup(html.content, 'html.parser')
		#label = soup.select('table tbody tr td span')
		data = soup.select('table tbody tr td')

		with open('debug2.txt', 'w') as file:
			#for i in range(len(data[0])):
			#	print(f'{i}: {data[0][i]}')
			#print(data[0], len(data[0]))
			for i in range(0, len(data), 2):
				file.write(f'{data[i].get_text().rstrip("0123456789")}: {data[i+1].get_text().rstrip("0123456789")}\n')
			file.close()
		"""
		for line in soup.find_all('td', class_=f'Pos(st) Start(0) Bgc($lv2BgColor) fi-row:h_Bgc($hoverBgColor) Pend(10px) Miw(140px)'):
			print(line)
		"""

	baseUrl = f'https://finance.yahoo.com/quote/{symbol}/key-statistics?p={symbol}'
	#baseUrl = f'https://finance.yahoo.com/quote/{symbol}?p={symbol}&.tsrc=fin-srch'
	headers = {
			'User-Agent': 'Mozilla/5.0 (X11 Ubuntu Linux x86_64 rv: 87.0) Gecko/20100101 Firefox/87.0',
			'Referer': 'https://www.google.fi',
	}
	
	try:
		response = requests.get(baseUrl, headers)
		response.raise_for_status()
	except HTTPError as http_err:
		print('Error downloading stock quote: ', symbol)
		print(f'HTTP ERROR OCCURED: {http_err}')
	except Exception as err:
		print(f'Other error accured: {err}')
	
	time.sleep(random.randint(2,5))
	return parse(response)






if __name__ == '__main__':
	getStockQuote('AAPL')
	print('***************************')
	#getStockQuote('DTF')















	"""
		symbols = []

		with open(env.microCSV) as file:
				reader = csv.reader(file, delimiter=',')
				i = 0
				symbols = []
				for row in reader:
						if len(row[0]) > 0:
								symbols.append(row[0].strip())
						if i == 248:
								break

		print(",".join(symbols))
		querystring = {"region": "US", "symbols": "AMD,IBM,AAPL"}

		headers = {
				'x-rapidapi-key': "3b102648a3mshdfa38a2ee225a2dp13dbc7jsn5f53c30c4083",
				'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
		}

		response = requests.request(
				"GET", env.url, headers=headers, params=querystring)

		print(response.text)
"""
