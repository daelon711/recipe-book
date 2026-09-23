<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/form-client/index.html');

require __DIR__.'/auth.php';
