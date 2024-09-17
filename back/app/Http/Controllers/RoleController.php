<?php

namespace App\Http\Controllers;

use App\Models\role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = role::get();
        return response()->json($roles, 200);
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
            'name' => 'required|unique:roles'
        ]);

        $roles = role::create($request->all());
        return response()->json($roles, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $roles = role::findOrFail($id);
        return response()->json(['Rol: ' => $roles], 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',

        ]);

        $roles = role::findOrFail($id);
        $roles->update($request->all());
        return response()->json(['message' => 'Rol Actualizado', 'Rol' => $roles, 200]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(role $role)
    {
        $roles = role::findOrFail($role->id);
        $roles->delete();
        return response()->json(['message' => 'Rol Eliminado', 'Rol' => $roles, 200]);
    }
}
