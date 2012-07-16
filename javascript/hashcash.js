function validate_token() {
    var resource = document.getElementById('hashcash').value;
    var randomstring = nonce();
    var d = new Date();
    var yyyymmdd = d.yyyymmdd();
    // valid hashcash v1.0 token
    var pre_token = '1:20:'+yyyymmdd+':'+resource+'::'+randomstring+':';
    mint_token(pre_token);
}

function nonce() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+';
    var string_length = 16;
    var randomstring = '';

    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }

    return randomstring;
}

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

function mint_token(pre_token) {
    var counter = 1;

    // slow while loop. because operating on strings? faster with binary?
    // bitshifting maybe?
    while(true){
        token = pre_token + counter;
        hash = CryptoJS.SHA1(token);
        coll = hash.toString(CryptoJS.enc.Hex).substring(0,5);
        if(coll.indexOf("00000") > -1) {
            break;
        }
        else {
            counter += 1;
        }
    }

    alert(token + "\n" + hash.toString(CryptoJS.enc.Hex));
}
