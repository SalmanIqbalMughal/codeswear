import { NextResponse } from "next/server"
import pinCodes from '../../../../pincodes.json'

export async function GET() {   
    return NextResponse.json(pinCodes)
}