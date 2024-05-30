<?php

namespace App\Http\Controllers;

use App\Mail\MarketingMail;
use App\Models\Client;
use App\Models\Email;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    function index(): \Illuminate\Http\JsonResponse
    {
        $mails = Email::with('client')->get();
        $response = [
            'status' => 'success',
            'mails' => $mails
        ];
        return response()->json($response, 200);
    }

    function sendMail(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:50',
            'body' => 'required|string',
            'client_ids' => 'required|array',
            'client_ids.*' => 'required|numeric|exists:clients,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $ids = $request->client_ids;
        $title = $request->title;
        $body = $request->body;
        $emails = Client::whereIn('id', $ids)->pluck('email')->toArray();
        foreach ($ids as $id) {
            Email::create([
                'client_id' => $id,
                'title' => $request->title,
                'body' => $request->body
            ]);
        }

        Mail::to($emails)->send(new MarketingMail($title, $body));

        $response = [
            'status' => 'success',
            'message' => 'Emails Sent Successfully'
        ];
        return response()->json($response, 200);
    }

    function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email_ids' => 'array|required',
            'email_ids.*' => 'required|numeric|exists:emails,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        foreach ($request->email_ids as $id) {
            $email = Email::find($id);
            $email->delete();
        }
        $response = [
            'status' => 'success',
            'message' => 'Emails Deleted Successfully'
        ];
        return response()->json($response, 200);
    }
}
