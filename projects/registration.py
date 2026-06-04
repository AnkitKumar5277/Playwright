import pytest
import allure
from playwright.sync_api import Page, expect

@allure.title("Opencart Registration Account Testing With Playwright_Mini_Project 3")
@allure.description("TC1 - Positive TC - Fill the registration form with valid data and verify account creation")
@pytest.mark.positive
def test_awesome_qa_registration(page: Page):

    page.goto("https://awesomeqa.com/ui/index.php?route=account/register")

    # Fill registration form
    page.locator("input[name='firstname']").fill("Ankit")
    page.locator("input[name='lastname']").fill("Kumar")
    page.locator("#input-email").fill("rt6dpr18@gmail.com")
    page.locator("#input-telephone").fill("6829994324")
    page.locator("input[name='password']").fill("Sakhamudi@3001")
    page.locator("input[name='confirm']").fill("Sakhamudi@3001")

    # Accept Privacy Policy
    page.locator("input[name='agree']").check()

    # Click Continue
    page.locator("input[type='submit']").click()

    # Verify URL
    expect(page).to_have_url(
        "https://awesomeqa.com/ui/index.php?route=account/success"
    )

    # Verify Success Message
    success_message = page.locator("h1")
    expect(success_message).to_have_text("Your Account Has Been Created!")

    print("Driver Title:", page.title())
    print("Success Message:", success_message.text_content())

    # pytest -v -s main.py

    # pytest main.py --headed --slowmo 1000 -s
