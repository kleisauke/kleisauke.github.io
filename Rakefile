#!/usr/bin/env rake
require 'jekyll'
require 'html-proofer'

task :default => [:test]

desc 'Generate site'
task :build do
  Jekyll::Site.new(Jekyll.configuration({
    'config' => './_config.yml'
  })).process
end

desc 'Validate generated site'
task :test => :build do
  HTMLProofer.check_directory('./html',{
    :url_swap => { '*.kleisauke.nl/' => '/' },
    :only_4xx => true,
    :check_favicon => true,
    :file_ignore => [ /portfolio-ajax-item-\d+.html/ ],
    :check_html => true,
    :allow_hash_href => true,
    :assume_extension => true,
    :disable_external => true
  }).run
end
