<?php

$app->get('/', [
  'VideoStreaming\Controllers\HomeController',
  'index'
])->setName('home');
