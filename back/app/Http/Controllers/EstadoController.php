<?php

namespace App\Http\Controllers;

use App\Models\Estado; // Corrected model name
use Illuminate\Http\Request;

class EstadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estados = estado::all(); // Corrected model name
        return response()->json($estados, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|unique:estados' // Corrected table name
        ]);

        $estado = estado::create($request->all()); // Removed square brackets
        return response()->json($estado, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $estado = estado::findOrFail($id);
        return response()->json(['estado' => $estado], 200); // Corrected response code
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|unique:estados,nombre,' . $id // Add exception for unique validation
        ]);

        $estado = estado::findOrFail($id);
        $estado->update($request->all());
        return response()->json(['message' => 'Estado Actualizado', 'estado' => $estado], 200); // Corrected response code and array key
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) // Corrected parameter
    {
        $estado = estado::findOrFail($id);
        $estado->delete();
        return response()->json(['message' => 'Estado Eliminado'], 200); // Corrected response code and removed unnecessary variable
    }
}
