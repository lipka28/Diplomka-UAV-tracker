class Scrambler {
  private merge(unixEpochStr: string, salt: string){
    let pt1 = unixEpochStr.split("");
    let pt2 = salt.split("");
    let res: string[] = [];
    
    for(let i = 0; i < unixEpochStr.length; i++){
      res.push(pt1[i]);
      res.push(pt2[i]);
    }
    return res.join("")
  }

  private makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }

 public encode(idString:string) {
    let saltTs = Math.round((new Date()).getTime() / 1000).toString();
    let chars = idString.split("");
    let result = "";
    let salting = "";
    while(chars.length >= salting.length) {
      salting += saltTs;
    }
    let key = salting.split("")
    for (let i = 0; i < chars.length; i++) {
      let charcode = (chars[i].charCodeAt(0)) + parseInt(key[i]);
      result += String.fromCharCode(charcode);
    }

    return this.merge(saltTs.split("").reverse().join(""), this.makeid(saltTs.length))+")"+result;
    }

 private decode(unknownString:string) {
    let chars = unknownString.split("");
    let key = "";
    let source = "";
    }
}

export default new Scrambler()