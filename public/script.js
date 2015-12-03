//This js will initialize angular app and contains all the main controllers

var app = angular.module('app',['ngRoute']);

//routing to generate different views

app.config(function($routeProvider){
    $routeProvider.when("/productDetail",{
            templateUrl: "views/productDetail.html",
            controller:"productDetailsCtrl"
        })
        .when("/editProduct",{
            templateUrl: "views/editProdView.html",
            controller:"editProdCtrl"
        })
        .when("/createProduct",{
            templateUrl: "views/createProdView.html",
            controller:"createProdCtrl"
        })
        .otherwise({redirectTo:'/index'});
});

// This controller is for showing product details in right content

app.controller('productDetailsCtrl',['$scope','shopifyData','$location','$route',
    function($scope, shopifyData, $location, $route){
            var id = shopifyData.getProductId();
            $scope.singleProduct = [];
            $scope.variants = [];
            $scope.images = [];

            shopifyData.getProductById(id)
                .success(function(response){
                    $scope.singleProduct = response.product;
                    $scope.images = $scope.singleProduct.images;
                    $scope.variants = $scope.singleProduct.variants;
                    $scope.selected = $scope.variants[0].image_id;
                    angular.forEach($scope.variants, function(val, key){
                    })
                });
            $scope.back = function(){
                $location.path('/index');
                $route.reload();
            }
    }
]);

// This is the main controller which is responsible for getting list of products

app.controller('productCtrl',['$scope','shopifyData','$location','$route','$window',
    function($scope, shopifyData, $location, $route, $window){
        var productData, prodToDel;
        $scope.products = [];
        $scope.image = [];
        shopifyData.allProducts()
            .success(function(response){
                $scope.products = response.products;
            });

//Getting details for specific product
        $scope.selectProduct = function(pid){
            $scope.pid = pid;
            shopifyData.setProductId($scope.pid);
            $location.path('/productDetail');
        };

//Storing product details to be edited in edit view
        $scope.editProduct = function(pid,title,desc){
            productData = {id:pid, title:title, desc:desc};
            shopifyData.setProductData(productData);
            $location.path('/editProduct');
        };

//product deletion
        $scope.delProduct = function(pid){
            prodToDel = pid;
            console.log("Deleting - "+prodToDel);
            if (confirm("Do you really want to delete product: "+prodToDel+" ?")) {
                shopifyData.delProduct(prodToDel);
                $window.location.href = '/index';
                $window.location.reload();
            }
        };
    }]);

//Controller used for new product creation

app.controller('createProdCtrl',['$scope','shopifyData','$location','$route',
    function($scope,shopifyData,$location,$route){
        $scope.createPrd = function(){
            $scope.imageArr = [];
            var newImgScr = "http:\/\/example.com\/rails_logo.gif";
            var image1 = {"src":newImgScr};
            $scope.imageArr.push(image1);
            var newProduct = {"title":$scope.pTitle,"body_html":$scope.prodDesc,"product_type":$scope.prodType,"images":$scope.imageArr};
            shopifyData.createProduct(newProduct).then(reload);
        };
        $scope.cancel = function(){
            reload();
        };
        function reload(){
            $location.path('/index');
            $route.reload();
        };
    }]);

//Controller used for editing a product

app.controller('editProdCtrl',['$scope','shopifyData','$location','$route','$window',
    function($scope, shopifyData, $location, $route, $window){
        var pdata = shopifyData.getProductData();
        $scope.pid = pdata.id;
        $scope.pTitle = pdata.title;
        $scope.prodDesc = pdata.desc;
        //shopifyData.editProduct(prodToEdit,prodData);
        $scope.updSubmit = function(){
            var updatedProduct = {"id":parseInt($scope.pid),"title":$scope.pTitle,"body_html":$scope.prodDesc};
            console.log("updated - "+updatedProduct.id);
            shopifyData.editProduct(updatedProduct.id,updatedProduct).then(reload);
        };
        $scope.cancel = function(){
            reload();
        };
        function reload(){
            $location.path('/index');
            $route.reload();
        }
    }]);