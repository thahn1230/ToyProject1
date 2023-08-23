from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium.webdriver.common.keys import Keys
import time
from selenium.common.exceptions import TimeoutException
import requests
import urllib.request
import json

from queryConfig import test_data
from dbAccess import db_config
import pymysql
import datetime


# for geocoding
endpoint = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode"

# Initialize the Chrome WebDriver
driver = webdriver.Chrome()

# Replace 'url' with the URL of the webpage you want to scrape
url = 'https://map.naver.com/v5/entry/place/11812026?c=17.28,0,0,0,dh'
driver.get(url)
driver.maximize_window()

# Wait for the page to load completely
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'btn_more')))

# Close the button
close_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, 'ng-trigger-fadeInEntryCloseButton')))
close_button.click()

# Category buttons
category_buttons = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'bubble_filter')))
category_buttons[0].click()

# Switch to Iframe
search_iframe_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'searchIframe')))
driver.switch_to.frame(search_iframe_element)

# Find nextPage button
# <a href="#" target="_self" role="button" class="eUTV2" aria-disabled="true"><span class="place_blind"></a>
nextPage = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'eUTV2')))[1]

# Pages and restaurants iteration
MAX_RETRIES = 5
name_before = ""

# For fast crawling, only for testing
# nextPage.click()
# nextPage.click()
# nextPage.click()
# nextPage.click()
# time.sleep(1)

new_test_data = ""
while(True):
    restaurants_in_page = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'TYaxT')))
    time.sleep(1)

    for restaurant in restaurants_in_page:
        retry_count = 0
        while retry_count < MAX_RETRIES:
            try:
                WebDriverWait(driver, 10).until(EC.element_to_be_clickable(restaurant)).click()
                break  # Click successful, exit loop
            except TimeoutException:
                # print(f"Click attempt {retry_count + 1} failed. Retrying...")
                retry_count += 1
                time.sleep(1)  # Delay before retrying
        
        if retry_count >= MAX_RETRIES:
            ###
            driver.switch_to.default_content()
            WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it(search_iframe_element))
            continue


        
        try: 
            driver.switch_to.parent_frame()
            entry_iframe_element = WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.ID, 'entryIframe')))

            name = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'Fc1rA'))).text
            if(name == name_before):
                driver.switch_to.default_content()
                WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it(search_iframe_element))
                continue
            category = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'DJJvD'))).text
            location = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'LDgIH'))).text

            # open status를 없애고 open close시간으로 바꿔야함
            open_status = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'time'))).text
            
            time.sleep(1)
            time_bar = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CLASS_NAME, 'U7pYf')))
            time_bar.click()

            time_detail ="'"
            days = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'i8cJw')))
            open_close_time = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'H3ua4')))
            for i, day in enumerate(days):
                time_detail += day.text + ' '+ open_close_time[i].text +  "\n"
            time_detail= time_detail[:-1]

            contact = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'xlx7Q'))).text

            q=urllib.parse.quote_plus(location)
            url = f"https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query={q}"
            request = urllib.request.Request(url)
            request.add_header("X-NCP-APIGW-API-KEY-ID", "c475psvaa6")
            request.add_header("X-NCP-APIGW-API-KEY", "bSHA0bDTsrc8yNN1egy89UioehVLQptayQynVpWH")
            res = json.loads(urllib.request.urlopen(request).read().decode("utf-8"))['addresses'][0]

            name_before = name

            new_restaurant = "{\n"
            new_restaurant += ("name : " + name + ',\n')
            new_restaurant += ("category : " +category+ ',\n')
            new_restaurant += ("location : " +location+ ',\n')
            # new_restaurant += ("last_order : " +open_status+ '\n')
            new_restaurant += ("time_detail : " +time_detail+ "',\n")
            new_restaurant += ("contact : " +contact+ ',\n')
            new_restaurant += ("coordinate : {" + "lon : " + res['x'] + ', ' + "lat : " + res['y'] + "}\n")
            new_restaurant += "},\n"

            print(new_restaurant)

            new_test_data += new_restaurant

            driver.switch_to.default_content()
            WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it(search_iframe_element))
        
        except TimeoutException:
            ###
            driver.switch_to.default_content()
            WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it(search_iframe_element))
            continue



    if(nextPage.get_attribute('aria-disabled') == "true"):
        break
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable(nextPage)).click()
    # nextPage.click()
    time.sleep(1)



with open("queryConfig.py","r", encoding="utf-8") as configFile:
    lines=configFile.readlines()
for i, line in enumerate(lines):
    if "test_data" in line:
        lines[i] = f"test_data = {repr(new_test_data)}\n"
        break

with open("queryConfig.py", "w", encoding="utf-8") as configFile:
    configFile.writelines(lines)

print("----finished----")
# Close the driver
driver.quit()
