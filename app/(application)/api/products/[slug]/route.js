import { NextResponse } from "next/server";
import connectDb from "../../../../../middleware/Connect";
import Product from "../../../../../models/Product";

export async function GET(req, { params }) {

    const { slug } = params;
    connectDb();

    let product = await Product.findOne({ slug: slug })
    // console.log(product);

    if (!product) {
        return NextResponse.json({ error: 404, product: null })
    }

    let variants = await Product.find({ title: product.title, category: product.category })
    // console.log(product);

    let colorSizeSlug = {};
    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
        else {
            colorSizeSlug[item.color] = {};
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
    }

    return NextResponse.json({ product: product, variants: colorSizeSlug })

}

export async function DELETE(req, { params }) {

    try {
        
        const { slug } = params;
        connectDb();
        
        await Product.findOneAndDelete({ slug: slug });
        return NextResponse.json({ success: true })
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false })
        
    }
}