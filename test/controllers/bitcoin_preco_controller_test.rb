require "test_helper"

class BitcoinPrecoControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get bitcoin_preco_show_url
    assert_response :success
  end
end
