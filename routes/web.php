<?php
#{{-- -------------------------------------------------🔱JAI SHREE MAHAKAAL🔱--------------------------------------------------------------- --}}
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ViewController;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
//Admin Panel Routes
Route::get('/', function () { return view('welcome');});
Route::post('/logout', function () {
    [AuthenticatedSessionController::class, 'destroy'];
    return view('auth.login');
});
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    ])->group(function () {
        Route::get('/dashboard', function () {
            return view('Admin.dashboard');
        })->name('dashboard');
    });
Route::get('/viewmaster', [ViewController::class, 'viewmaster'])->name('viewmaster');
Route::get('/viewenquirylist',[ViewController::class,'viewenquirylist'])->name('viewenquirylist');
Route::get('/adminprofile',[ViewController::class,'adminprofile'])->name('adminprofile');
