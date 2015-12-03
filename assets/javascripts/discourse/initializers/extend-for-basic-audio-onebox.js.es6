import PostView from 'discourse/views/post';

export default {
  name: 'extend-for-basic-audio-onebox',

  initialize() {
    PostView.reopen({
    });
  }
}

