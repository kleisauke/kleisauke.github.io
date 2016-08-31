# jekyll-sass-converter to load styles from bootstrap-sass gem.

require 'bootstrap'

module Jekyll
  module Converters
    class Scss < Converter

      def user_sass_load_paths
        paths = Array(jekyll_sass_configuration["load_paths"])
        paths << ::Bootstrap.stylesheets_path
      end

    end
  end
end

# bootstrap requires minimum precision of 8, see https://github.com/twbs/bootstrap-sass/issues/409
::Sass::Script::Number.precision = [8, ::Sass::Script::Number.precision].max
