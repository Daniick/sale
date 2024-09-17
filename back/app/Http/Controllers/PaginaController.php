<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use App\Models\pagina;
use Illuminate\Http\Request;

class PaginaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginas = pagina::all();
        return response()->json($paginas, 200);
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
            'palabra' => 'required|string|unique:paginas',
            'espanol' => 'required|string',
            'ingles' => 'nullable|string',
        ]);

        $pagina = Pagina::create($request->all());
        Bitacora::add("Pagina WEB creada con id: {$pagina->id}");
        return response()->json($pagina, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $paginas = Pagina::findOrFail($id);
        return response()->json(['Pagina: ' => $paginas], 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pagina $pagina)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, pagina $pagina)
    {
        $request->validate([
            'palabra' => 'required|string|unique',
            'espanol' => 'required|string',
            'ingles' => 'nullable|string',
        ]);

        $pagina->update($request->all());
        return response()->json(['message' => 'Pagina Actualizada', 'Pagina' => $pagina, 200]); // 200 = OK, 201 = Created, 204 = No Content, 400 = Bad Request, 401 = Unauthorized, 403 = Forbidden, 404 = Not Found, 422 = Unprocessable Entity, 500 = Internal Server Error, 503 =
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(pagina $pagina)
    {
        $pagina = Pagina::findOrFail($pagina->id);
        $pagina->delete();
        Bitacora::add("Se ah eliminado la Pagina WEB creada con id: {$pagina->id}");
        return response()->json(['message' => 'Pagina Eliminada', 'Pagina' => $pagina, 200]); // 200 = OK, 201 = Created, 204 = No Content, 400 = Bad Request, 401 = Unauthorized, 403 = Forbidden, 404 = Not Found, 42

    }
}
