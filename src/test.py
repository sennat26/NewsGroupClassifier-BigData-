import string
import os
from pymongo import MongoClient
client = MongoClient()
db = client.bigdata
collection = db.test
i = 0
rootdir ='C:/Senthil/UTD/Project/20news-bydate/20news-bydate-test'
for subdir, dirs, files in os.walk(rootdir):
	category = subdir.replace(rootdir+'\\','')
	print (category)
	for file in files:
		f=open(subdir+"/"+file)
		text = f.read()
		text_file_doc = {"category_name": category, "contents" : text }
		collection.insert(text_file_doc)
		break
	i= i+1
	if(i==2):
		break
		