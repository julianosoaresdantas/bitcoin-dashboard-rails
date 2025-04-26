# app/controllers/bitcoin_preco_controller.rb
require 'net/http'
require 'json'

class BitcoinPrecoController < ApplicationController
  def atual
    fsyms = params[:fsyms] || 'BTC,ETH,LTC'
    tsyms = params[:tsyms] || 'USD'
    url = URI("https://api.coinranking.com/v2/coins?symbols=#{fsyms}&convert=#{tsyms.split(',').join('&convert=')}")
    api_key = ENV['COINRANKING_API_KEY']

    Rails.logger.info "Valor da chave de API lida do .env: #{api_key}"

    begin
      Rails.logger.info "Iniciando requisição para: #{url}"
      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      request = Net::HTTP::Get.new(url.request_uri)
      request['x-access-token'] = api_key
      response = http.request(request)
      Rails.logger.info "Status da resposta: #{response.code}"

      unless response.is_a?(Net::HTTPSuccess)
        Rails.logger.error "Erro ao acessar a API: #{response.code} #{response.message} - #{response.body}"
        render json: { error: "Erro ao obter dados da API." }, status: :service_unavailable
        return
      end

      body = response.body
      Rails.logger.info "Corpo da resposta da API: #{body}"
      data = JSON.parse(body)
      Rails.logger.info "Dados parseados da API: #{data.inspect}"

      formatted_data = {}
      if data && data['data'] && data['data']['coins']
        data['data']['coins'].each do |coin|
          Rails.logger.info "Dados da moeda da API: #{coin.inspect}"
          symbol = coin['symbol']
          price = coin['price']
          change_24h = coin['change']

          formatted_data[symbol] = {
            preco: price,
            mudanca_percentual: change_24h ? change_24h.to_f.round(2) : nil,
            mudanca_absoluta: nil
          }
        end
      end

      render json: formatted_data
    rescue JSON::ParserError => e
      Rails.logger.error "Erro ao parsear a resposta da API: #{e.message}"
      render json: { error: "Erro ao processar os dados da API." }, status: :internal_server_error
      return
    rescue StandardError => e
      Rails.logger.error "Erro genérico ao acessar a API: #{e.message}"
      render json: { error: "Erro inesperado ao obter os dados." }, status: :internal_server_error
      return
    end
  end

  def show
    # Esta ação provavelmente renderiza a sua página HTML (show.html.erb)
  end
end