<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::with('role', 'estado')->get();
        return response()->json($user, 200);
    }


    public function login(Request $request)
    {
        $request->validate([
            "email" => 'required|string',
            "password" => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer', 'user' => $user], 200);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => 'required|string',
            "email" => 'required|string',
            "password" => 'required|string',
            "telefono" => 'required|string',
            "curso" => 'required|string',
            "id_rol" => 'integer',


        ]);

        $data = $request->all();
        $data['password'] = Hash::make($request->password);

        $user = User::create($data);


        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json(['user: ' => $user], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            "name" => 'required|string',
            "email" => 'required|string',
            "password" => 'required|string',
            "telefono" => 'required|string',
            "apellido" => 'string',
            "curso" => 'required|string',
            "id_rol" => 'integer',
        ]);

        $user = User::findOrFail($id);
        $data = $request->all();

        if ($request->has('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json($user, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $User = User::findOrFail($id);
        $User->delete();
        Bitacora::add("Se ah eliminado el Usuario con id: {$User->id}");
        return response()->json(['User: ' => $User], 200);
    }
}
