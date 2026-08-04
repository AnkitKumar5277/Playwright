import pytest
import allure
from playwright.sync_api import sync_playwright


@allure.title("Playwright Mini Project - Amazon")
@allure.description("Print laptop items and prices from Amazon India")
@pytest.mark.itemsandprice
def test_print_items_price_amazon():

    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel="msedge",
            headless=False
        )

        context = browser.new_context()
        page = context.new_page()

        page.goto("https://www.amazon.in/")
        page.wait_for_timeout(3000)

        # Search for laptop
        page.locator("#twotabsearchtextbox").fill("laptop")
        page.locator("#twotabsearchtextbox").press("Enter")

        page.wait_for_load_state("networkidle")

        # Get all product titles
        titles = page.locator(
            "//div[@data-component-type='s-search-result']//h2"
        ).all_text_contents()

        # Get all product prices
        prices = page.locator(
            "//div[@data-component-type='s-search-result']//span[@class='a-price-whole']"
        ).all_text_contents()

        print("\n===== Your Items and Prices on Amazon India =====\n")

        # Safely pair titles and prices
        for title, price in zip(titles, prices):
            print(f"{title} - ₹{price}")
            print()

        page.wait_for_timeout(5000)

        browser.close()
