# name: Basic Audio Player
# about: Returns the absolute path to audio file uploads so that they are oneboxed
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

  Email::Receiver.class_eval do
    def upload_base_url
      if SiteSetting.enable_s3_uploads
        "https:"
      else
        Discourse.base_url
      end
    end

    def attachment_markdown(upload)
      if FileHelper.is_image?(upload.original_filename)
        "<img src='#{upload.url}' width='#{upload.width}' height='#{upload.height}'>"
      elsif FileHelper.is_audio_file?(upload.original_filename)
        upload_base_url + upload.url
      else
        "<a class='attachment' href='#{upload.url}'>#{upload.original_filename}</a> (#{number_to_human_size(upload.filesize)})"
      end
    end
  end
end