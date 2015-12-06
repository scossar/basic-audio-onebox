# name: Basic Audio Player
# about: Allows audio uploads to be oneboxed
# version: 0.1
# authors: scossar
# url: https://github.com/scossar/basic-audio-player

enabled_site_setting :basic_audioplayer_enabled

register_asset 'javascripts/discourse/lib/utilities.js'


after_initialize do
  FileHelper.class_eval do
    def self.is_audio_file?(filename)
      filename =~ audio_files_regexp
    end

    def self.audio_files
      @@audio_files ||= Set.new ["mp3", "ogg", "wav"]
    end

    def audio_files_regexp
      @@audio_files_regexp ||= /\.(#{audio_files.to_a.join("|")})$/i
    end
  end
end