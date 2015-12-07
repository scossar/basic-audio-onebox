Discourse.Utilities.isAudioFile = function(path) {
  return (/\.(wav|mp3|ogg)$/i).test(path);
};

Discourse.Utilities.uploadBaseUrl = function() {
  if (Discourse.S3BaseUrl) {
    return 'https:';
  } else {
    var protocol = window.location.protocol + '//',
      hostname = window.location.hostname,
      port = ':' + window.location.port;
    if (port) {
      return protocol + hostname + port;
    } else {
      return protocol + hostname;
    }
  }
};

Discourse.Utilities.filenameWithoutExtension = function(filename) {
  return filename.split('.')[0];
};

Discourse.Utilities.getUploadMarkdown = function(upload) {
  if (Discourse.Utilities.isAnImage(upload.original_filename)) {
    return '<img src="' + upload.url + '" width="' + upload.width + '" height="' + upload.height + '">';
  } else if (Discourse.Utilities.isAudioFile(upload.original_filename)) {
    return Discourse.Utilities.uploadBaseUrl() + upload.url + '?filename=' + Discourse.Utilities.filenameWithoutExtension(upload.original_filename);
  } else {
    return '<a class="attachment" href="' + upload.url + '">' + upload.original_filename + '</a> (' + I18n.toHumanSize(upload.filesize) + ')';
  }
};