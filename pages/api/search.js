import woocommerce from '../../lib/woocommerce';


export default async function handler(req, res) {
    try {
        if(req.body != ''){
            const {data: request} = await woocommerce.get('products?search='+req.body+'&per_page=6');
            
            //return the response as JSON to the app
            res.status(200).json(request);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
  