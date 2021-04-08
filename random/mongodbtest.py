from pymongo import MongoClient
from pprint import pprint

username = 'aslkdjlmf'
password = 'A7cUsJq0dT34jbbE'
baseUrl = f'mongodb+srv://aslkdjlmf:{password}@cluster0.zkoea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

client = MongoClient(baseUrl)
#db = client.admin
# Issue the serverStatus command and print the results
#serverStatusResult = db.command("serverStatus")
#pprint(serverStatusResult)
print(client.test)
