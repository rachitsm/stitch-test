//Factory method to fetch json data from Shopify API

app.factory('shopifyData', ['$http', function($http){
    var prodId,pDataObj;

//Get all products
    function allProducts(){
        return $http.get('http://localhost:3030/shopify/get?path=/admin/products.json');
    }

//Save product ID to share with another controller
    function setProductId(pid){
        prodId = pid;
        console.log("prodId in Service "+prodId);
    }

//Retrieve product ID to share with another controller
    function getProductId(){
        return prodId;
    }

//Get a single product detail from server
    function getProduct(pid){
        return $http.get('http://localhost:3030/shopify/get?path=/admin/products/'+pid+'.json?fields=id,body_html,variants,images');
    }

//Update specific product on server
    function editProduct(pid, prodData){
        var product = {"product":prodData};
        return $http({
            'method':'PUT',
            'url':'http://localhost:3030/shopify/put?path=/admin/products/'+pid+'.json',
            data: product
        }).then(successResp,errResp);
    }

//Delete specific product on server
    function delProduct(pid){
        return $http({
            'method':'DELETE',
            'url':'http://localhost:3030/shopify/delete?path=/admin/products/'+pid+'.json',
        }).then(successResp,errResp);
    }

//Save product data to share with another controller
    function setProductData(pData){
        pDataObj = pData;
        console.log("object set in service "+pDataObj);
    }

//Retrieve product data to share with another controller
    function getProductData(){
       return pDataObj;
    }

//Function to create a new product and call Shopify proxy
    function createProduct(newPrd){
        var product = {"product":newPrd};
        return $http({
            'method':'POST',
            'url':'http://localhost:3030/shopify/post?path=/admin/products.json',
            data: product
        }).then(successResp,errResp);
    }

//Success response from put/delete
    function successResp(response){
        console.log("Put/delete - "+response.data);
        console.log("Put/delete - "+response.status);
    }

//Error response from put/delete
    function errResp(response){
        //return response.data;
        console.log("Put/delete - "+response.data);
    }

// Factory functions
    return{
        allProducts : allProducts,
        getProductById : getProduct,
        setProductId : setProductId,
        getProductId : getProductId,
        editProduct : editProduct,
        delProduct : delProduct,
        createProduct : createProduct,
        setProductData : setProductData,
        getProductData : getProductData
    }
}]);