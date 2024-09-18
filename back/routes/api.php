<?php

use App\Http\Controllers\AlmuerzoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BitacoraController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\PaginaController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsuarioController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/me', [AuthController::class, 'me']);
    Route::post('/register', [AuthController::class, 'register']);
});
Route::resource('/estados', EstadoController::class);

Route::resource('/roles', RoleController::class);

Route::resource('/usuarios', UserController::class);

Route::resource('/almuerzos', AlmuerzoController::class);

Route::resource('/reservas', ReservaController::class);

Route::resource('/paginas', PaginaController::class);


Route::resource('/bitacoras', BitacoraController::class);
