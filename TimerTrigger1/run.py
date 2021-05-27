import os
from bs4 import BeautifulSoup
import urllib.request as req
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pyrebase


# Use a service account
# cred = credentials.Certificate('path/to/serviceAccount.json')
# firebase_admin.initialize_app(cred)

# db = firestore.client()

# python으로 정보 넣기
firebaseConfig = {
    "apiKey": "AIzaSyDkHR3J8gg7ER7rUSm73nJgGN1vIKDdJLI",
    "authDomain": "assign-gamble-web-cloud.firebaseapp.com",
    "projectId": "assign-gamble-web-cloud",
    "databaseURL": "https://assign-gamble-web-cloud-default-rtdb.firebaseio.com/",
    "storageBucket": "assign-gamble-web-cloud.appspot.com",
    "messagingSenderId": "285912167841",
    "appId": "1:285912167841:web:9f0713758fae33b672c7e0",
    "measurementId": "G-274ERT67VV"
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()


# 네이버에서 환율 가져오기
url = "https://finance.naver.com/marketindex/"

res = req.urlopen(url)
soup = BeautifulSoup(res,"html.parser", from_encoding='euc-kr')

name_nation = soup.select('h3.h_lst > span.blind')
name_price = soup.select('span.value')
change = soup.select('span.change')
blind = soup.select('div.head_info > span.blind')


# i = 0
# for c_list in soup:
#      try:
#           print(i+1,name_nation[i].text, name_price[i].text, change[i].text, blind[i].text)
#           i = i + 1
#      except IndexError:
#           pass


i = 5
price_txt=name_price[0].text
print(price_txt)
price = price_txt.replace(",","")
print(price)
# try:
#      db.child("admin").child("usd").update({i:usd})
#      i = i + 1
# except IndexError:
#      pass
