require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TesteBitcoinNovo
  class Application < Rails::Application
    config.autoload_paths << Rails.root.join("app", "controllers")
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1
    config.public_file_server.enabled = true

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain helper modules. Chatbots, etc.
    # config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Explicitly add the app/controllers directory to the autoload paths.
    config.autoload_paths << Rails.root.join("app", "controllers")

    # ADICIONE ESTA LINHA AQUI:
    config.assets.paths << Rails.root.join('app/javascript')
  end
end