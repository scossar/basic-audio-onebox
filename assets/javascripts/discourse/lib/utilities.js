Discourse.Utilities.isAudioFile = function(path) {
  return (/\.(wav|mp3|ogg)$/i).test(path);
};

Discourse.Utilities.getUploadMarkdown = function(upload) {
  if (Discourse.Utilities.isAnImage(upload.original_filename)) {
    return '<img src="' + upload.url + '" width="' + upload.width + '" height="' + upload.height + '">';
  } else if (Discourse.Utilities.isAudioFile(upload.original_filename)) {
    return '<audio controls><source src="' + upload.url + '"><a href="' + upload.url + '"> ' + upload.original_filename + '</a></audio>'
  } else {
    return '<a class="attachment" href="' + upload.url + '">' + upload.original_filename + '</a> (' + I18n.toHumanSize(upload.filesize) + ')';
  }
};