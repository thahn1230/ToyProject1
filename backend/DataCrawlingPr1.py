from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium.webdriver.common.keys import Keys
import time
from selenium.common.exceptions import TimeoutException
from geopy.geocoders import Nominatim

# Initialize the Chrome WebDriver
driver = webdriver.Chrome()

# Replace 'url' with the URL of the webpage you want to scrape
url = 'https://map.naver.com/v5/entry/place/20198577?c=14.7,0,0,0,dh'
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
# nextPage.click()
# nextPage.click()
# nextPage.click()
# nextPage.click()
# time.sleep(1)
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
                print(f"Click attempt {retry_count + 1} failed. Retrying...")
                retry_count += 1
                time.sleep(1)  # Delay before retrying
        
        if retry_count >= MAX_RETRIES:
            print("Max retries reached. Skipping restaurant.")
            continue

        # time.sleep(1)
        driver.switch_to.parent_frame()
        entry_iframe_element = WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.ID, 'entryIframe')))
        # driver.switch_to.frame(entry_iframe_element)

        name = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'Fc1rA'))).text
        if(name == name_before):
            driver.switch_to.default_content()
            WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it(search_iframe_element))
            continue
        category = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'DJJvD'))).text
        location = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'LDgIH'))).text
        open_status = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'time'))).text
        contact = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'xlx7Q'))).text

        name_before = name
        print(name)
        print(category)
        print(location)
        print(open_status)
        print(contact)
        print('\n')


        driver.switch_to.default_content()
        # WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.ID, 'searchIframe')))
        WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it(search_iframe_element))
        # time.sleep(1)


    if(nextPage.get_attribute('aria-disabled') == "true"):
        break
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable(nextPage)).click()
    # nextPage.click()
    time.sleep(1)

print("----finished----")
# Close the driver
driver.quit()
