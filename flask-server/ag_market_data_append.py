from datetime import datetime, timedelta
import pytz

import time

import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrape_specific_table_by_class_tomato(url, table_class):
    file_path = 'src\\static\\agmarket_dataset.csv'
    df = pd.read_csv(file_path)
    
    response = requests.get(url)

    if response.status_code == 200:
        
        soup = BeautifulSoup(response.text, 'html.parser')

        target_table = soup.find('table', class_=table_class)
        
        if target_table:
            
            rows = target_table.find_all('tr')[1:2]
            for row in rows:
                columns = row.find_all(['td', 'th'])
                print([column.text for column in columns])
                columns.pop(5)
                columns.pop(4)
                columns.pop(3)
                columns.pop(0)
                col_lst =[column.text for column in columns]
                col_lst_date = col_lst[5:]
                for item_date in col_lst_date:
                    col_str_date = item_date
                date_lst = col_str_date.split()
                col_lst.pop(len(col_lst)-1)
                col_lst.extend(date_lst)
                for i, j in enumerate(col_lst):
                    if i == 0:
                        match j:
                            case "Sholapur":
                                col_lst[i] = 2
                            case "Jalgaon":
                                col_lst[i] = 6
                            case "Ahmednagar":
                                col_lst[i] = 1
                    if i == 1:
                        match j:
                            case "Solapur" | "Akluj":
                                col_lst[i] = 2
                            case "Jalgaon" | "Bhusaval":
                                col_lst[i] = 6
                            case "Ahmednagar":
                                col_lst[i] = 1
                    if i == 5:
                        col_lst[i] = int(j)
                    if i == 6:
                        match j:
                            case "Jan":
                                col_lst[i] = 1
                            case "Feb":
                                col_lst[i] = 2
                            case "Mar":
                                col_lst[i] = 3
                            case "Apr":
                                col_lst[i] = 4
                            case "May":
                                col_lst[i] = 5
                            case "Jun":
                                col_lst[i] = 6
                            case "Jul":
                                col_lst[i] = 7
                            case "Aug":
                                col_lst[i] = 8
                            case "Sep": 
                                col_lst[i] = 9
                            case "Oct":
                                col_lst[i] = 10
                            case "Nov":
                                col_lst[i] = 11
                            case "Dec":
                                col_lst[i] = 12
                    if i == 7:
                        col_lst[i] = int(j)
                col_lst.insert(2, 1)
                print(col_lst)
                df = df.append(pd.Series(col_lst, index=df.columns), ignore_index=True)
                df.to_csv(file_path, index=False)
                print("Done")

        else:
            print(f"Table with class '{table_class}' not found on the page.")

    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        
def scrape_specific_table_by_class_potato(url, table_class):
    file_path = 'src\\static\\agmarket_dataset.csv'
    df = pd.read_csv(file_path)
    
    response = requests.get(url)

    if response.status_code == 200:
        
        soup = BeautifulSoup(response.text, 'html.parser')

        target_table = soup.find('table', class_=table_class)
        
        if target_table:
            
            rows = target_table.find_all('tr')[1:2]
            for row in rows:
                columns = row.find_all(['td', 'th'])
                print([column.text for column in columns])
                columns.pop(5)
                columns.pop(4)
                columns.pop(3)
                columns.pop(0)
                col_lst =[column.text for column in columns]
                col_lst_date = col_lst[5:]
                for item_date in col_lst_date:
                    col_str_date = item_date
                date_lst = col_str_date.split()
                col_lst.pop(len(col_lst)-1)
                col_lst.extend(date_lst)
                for i, j in enumerate(col_lst):
                    if i == 0:
                        match j:
                            case "Sholapur":
                                col_lst[i] = 2
                            case "Jalgaon":
                                col_lst[i] = 6
                            case "Ahmednagar":
                                col_lst[i] = 1
                    if i == 1:
                        match j:
                            case "Solapur" | "Akluj":
                                col_lst[i] = 2
                            case "Jalgaon" | "Bhusaval":
                                col_lst[i] = 6
                            case "Ahmednagar":
                                col_lst[i] = 1
                    if i == 5:
                        col_lst[i] = int(j)
                    if i == 6:
                        match j:
                            case "Jan":
                                col_lst[i] = 1
                            case "Feb":
                                col_lst[i] = 2
                            case "Mar":
                                col_lst[i] = 3
                            case "Apr":
                                col_lst[i] = 4
                            case "May":
                                col_lst[i] = 5
                            case "Jun":
                                col_lst[i] = 6
                            case "Jul":
                                col_lst[i] = 7
                            case "Aug":
                                col_lst[i] = 8
                            case "Sep": 
                                col_lst[i] = 9
                            case "Oct":
                                col_lst[i] = 10
                            case "Nov":
                                col_lst[i] = 11
                            case "Dec":
                                col_lst[i] = 12
                    if i == 7:
                        col_lst[i] = int(j)
                col_lst.insert(2, 2)
                print(col_lst)
                df = df.append(pd.Series(col_lst, index=df.columns), ignore_index=True)
                df.to_csv(file_path, index=False)
                print("Done")

        else:
            print(f"Table with class '{table_class}' not found on the page.")

    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        
def scrape_specific_table_by_class_onion(url, table_class):
    file_path = 'src\\static\\agmarket_dataset.csv'
    df = pd.read_csv(file_path)
    
    response = requests.get(url)

    if response.status_code == 200:
        
        soup = BeautifulSoup(response.text, 'html.parser')

        target_table = soup.find('table', class_=table_class)
        
        if target_table:
            
            rows = target_table.find_all('tr')[1:2]
            for row in rows:
                columns = row.find_all(['td', 'th'])
                print([column.text for column in columns])
                columns.pop(5)
                columns.pop(4)
                columns.pop(3)
                columns.pop(0)
                col_lst =[column.text for column in columns]
                col_lst_date = col_lst[5:]
                for item_date in col_lst_date:
                    col_str_date = item_date
                date_lst = col_str_date.split()
                col_lst.pop(len(col_lst)-1)
                col_lst.extend(date_lst)
                for i, j in enumerate(col_lst):
                    if i == 0:
                        match j:
                            case "Sholapur":
                                col_lst[i] = 2
                            case "Jalgaon":
                                col_lst[i] = 6
                            case "Ahmednagar":
                                col_lst[i] = 1
                    if i == 1:
                        match j:
                            case "Solapur" | "Akluj":
                                col_lst[i] = 2
                            case "Jalgaon" | "Bhusaval":
                                col_lst[i] = 6
                            case "Ahmednagar":
                                col_lst[i] = 1
                    if i == 5:
                        col_lst[i] = int(j)
                    if i == 6:
                        match j:
                            case "Jan":
                                col_lst[i] = 1
                            case "Feb":
                                col_lst[i] = 2
                            case "Mar":
                                col_lst[i] = 3
                            case "Apr":
                                col_lst[i] = 4
                            case "May":
                                col_lst[i] = 5
                            case "Jun":
                                col_lst[i] = 6
                            case "Jul":
                                col_lst[i] = 7
                            case "Aug":
                                col_lst[i] = 8
                            case "Sep": 
                                col_lst[i] = 9
                            case "Oct":
                                col_lst[i] = 10
                            case "Nov":
                                col_lst[i] = 11
                            case "Dec":
                                col_lst[i] = 12
                    if i == 7:
                        col_lst[i] = int(j)
                col_lst.insert(2, 2)
                print(col_lst)
                df = df.append(pd.Series(col_lst, index=df.columns), ignore_index=True)
                df.to_csv(file_path, index=False)
                print("Done")

        else:
            print(f"Table with class '{table_class}' not found on the page.")

    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")

today_date = datetime.now()

yesterday_date = today_date - timedelta(days=1)

formatted_date = yesterday_date.strftime("%d-%b-%Y")

while(1):
    india_timezone = pytz.timezone('Asia/Kolkata')

    # Get the current time in India
    current_time_in_india = datetime.now(india_timezone).strftime("%H")

    url_to_tom_links = {
        "url1": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=78&Tx_State=MH&Tx_District=16&Tx_Market=176&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Tomato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Sholapur&Tx_MarketHead=Solapur",
        "url2": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=78&Tx_State=MH&Tx_District=16&Tx_Market=1806&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Tomato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Sholapur&Tx_MarketHead=Akluj",
        "url3": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=78&Tx_State=MH&Tx_District=7&Tx_Market=159&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Tomato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Jalgaon&Tx_MarketHead=Jalgaon",
        "url4": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=78&Tx_State=MH&Tx_District=7&Tx_Market=1438&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Tomato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Jalgaon&Tx_MarketHead=Bhusaval",
        "url5": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=78&Tx_State=MH&Tx_District=1&Tx_Market=153&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Tomato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Ahmednagar&Tx_MarketHead=Ahmednagar",
    }
    url_to_pot_links = {
        "url1": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=24&Tx_State=MH&Tx_District=16&Tx_Market=176&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Potato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Sholapur&Tx_MarketHead=Solapur",
        "url2": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=24&Tx_State=MH&Tx_District=16&Tx_Market=1806&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Potato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Sholapur&Tx_MarketHead=Akluj",
        "url3": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=24&Tx_State=MH&Tx_District=7&Tx_Market=159&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Potato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Jalgaon&Tx_MarketHead=Jalgaon",
        "url4": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=24&Tx_State=MH&Tx_District=7&Tx_Market=1438&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Potato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Jalgaon&Tx_MarketHead=Bhusaval",
        "url5": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=24&Tx_State=MH&Tx_District=1&Tx_Market=153&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Potato&Tx_StateHead=Maharashtra&Tx_DistrictHead=Ahmednagar&Tx_MarketHead=Ahmednagar",
    }
    url_to_oni_links = {
        "url1": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=23&Tx_State=MH&Tx_District=16&Tx_Market=176&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Onion&Tx_StateHead=Maharashtra&Tx_DistrictHead=Sholapur&Tx_MarketHead=Solapur",
        "url2": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=23&Tx_State=MH&Tx_District=16&Tx_Market=1806&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Onion&Tx_StateHead=Maharashtra&Tx_DistrictHead=Sholapur&Tx_MarketHead=Akluj",
        "url3": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=23&Tx_State=MH&Tx_District=7&Tx_Market=159&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Onion&Tx_StateHead=Maharashtra&Tx_DistrictHead=Jalgaon&Tx_MarketHead=Jalgaon",
        "url4": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=23&Tx_State=MH&Tx_District=7&Tx_Market=1438&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Onion&Tx_StateHead=Maharashtra&Tx_DistrictHead=Jalgaon&Tx_MarketHead=Bhusaval",
        "url5": "https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=23&Tx_State=MH&Tx_District=1&Tx_Market=153&DateFrom="+formatted_date+"&DateTo="+formatted_date+"&Fr_Date="+formatted_date+"&To_Date="+formatted_date+"&Tx_Trend=2&Tx_CommodityHead=Onion&Tx_StateHead=Maharashtra&Tx_DistrictHead=Ahmednagar&Tx_MarketHead=Ahmednagar",
    }
    print(current_time_in_india)
    if str(current_time_in_india) == "02":
        for item_url in url_to_tom_links:
            url_to_scrape = url_to_tom_links[item_url]
            table_class_to_scrape = 'tableagmark_new'
            scrape_specific_table_by_class_tomato(url_to_scrape, table_class_to_scrape)
        for item_url in url_to_pot_links:
            url_to_scrape = url_to_pot_links[item_url]
            table_class_to_scrape = 'tableagmark_new'
            scrape_specific_table_by_class_potato(url_to_scrape, table_class_to_scrape)
        for item_url in url_to_oni_links:
            url_to_scrape = url_to_oni_links[item_url]
            table_class_to_scrape = 'tableagmark_new'
            scrape_specific_table_by_class_onion(url_to_scrape, table_class_to_scrape)
    time.sleep(60*60)