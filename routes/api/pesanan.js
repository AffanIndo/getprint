const express = require("express");
const router = express.Router();
const Pesanan = require("../../models/Pesanan");
const mongoose = require('mongoose');

router.post('/pesanan', (req,res) => {
    let data = req.body;

    const newPesanan = new Pesanan({
        userid_line : data.userid_line,
        id_toko : data.id_toko,
        nama_pemesan : data.nama,
        nohp_pemesan : data.nohp_pemesan,
        jenis_pesanan : data.jenispesanan,
        alamat_pemesan : data.alamat_pemesan,
    })

    newPesanan.save()
        .then(pesanan => 
            console.log(pesanan),
            res.status(200).json({status : true,
                            message : 'Success added Pesanan',
                            pesanan : newPesanan})
            )
        .catch(err => 
            console.log(err),
            res.status(400).json({status : false,
                message : 'Pesanan gagal, cek lagi data yang dimasukkan!',
                })
            );  
});

router.get('/pesanan/:lineid', (req,res) => {
    const lineid = req.params.lineid;
    
    Pesanan.aggregate([
        {$sort : {added : -1}},
        {$match : {'userid_line' : lineid}},
        {$lookup : {from: 'mitras', localField: 'id_toko', foreignField: '_id' , as: 'toko',}},
    ]).exec((err,data) => {
        if(err){
            return res.status(400).json({status : false,
                                        message : 'failed get pesanan',
                                        error : err});
        }else if(data.length == 0){
            return res.status(400).json({status : false,
                                        message : 'failed get pesanan',
                                        error : 'pesanan not found'});
        }else{
            
            return res.status(200).json({status : true,
                                        message : 'succes get pesanan',
                                        pesanan : data});
        }
    })
});

router.get('/pesanan/byid/:id', (req,res) => {
    const id = req.params.id;
    
    Pesanan.aggregate([
        {$sort : {added : -1}},
        {$match : {'_id' : mongoose.Types.ObjectId(id)}},
        {$lookup : {from: 'mitras', localField: 'id_toko', foreignField: '_id' , as: 'toko',}},
    ]).exec((err,data) => {
        if(err){
            return res.status(400).json({status : false,
                                        message : 'failed get pesanan',
                                        error : err});
        }else if(data.length == 0){
            return res.status(400).json({status : false,
                                        message : 'failed get pesanan',
                                        error : 'pesanan not found'});
        }else{
            
            return res.status(200).json({status : true,
                                        message : 'succes get pesanan',
                                        pesanan : data});
        }
    })
});


module.exports = router