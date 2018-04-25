function zero(){
    return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
}
function ident(){
    return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
}
function mult(a,b){
    var ah=a.length;
    var aw=a[0].length;
    var bh=b.length;
    var bw=b[0].length;
    if(aw!==bh)return [["nope"]];
    var res=[];
    for(var y=0;y<ah;y++){
        var row=[];
        for(var x=0;x<bw;x++){
            var sum=0;
            for(var i=0;i<aw;i++)
                sum+=a[y][i]*b[i][x];
            row.push(sum);
        }
        res.push(row);
    }
    return res;
}
function tpose(m){
    var res=[];
    for(x=0;x<m[0].length;x++){
        var row=[];
        for(y=0;y<m.length;y++)
            row.push(m[y][x]);
        res.push(row);
    }
    return res;
}
function inv4x4(m){
    if(m.length!==4)return[["nope"]];
    for(var i=0;i<4;i++)
        if(m[i].length!==4)return[["nope"]];
    var s0=m[0][0]*m[1][1]-m[1][0]*m[0][1];
    var s1=m[0][0]*m[1][2]-m[1][0]*m[0][2];
    var s2=m[0][0]*m[1][3]-m[1][0]*m[0][3];
    var s3=m[0][1]*m[1][2]-m[1][1]*m[0][2];
    var s4=m[0][1]*m[1][3]-m[1][1]*m[0][3];
    var s5=m[0][2]*m[1][3]-m[1][2]*m[0][3];

    var c5=m[2][2]*m[3][3]-m[3][2]*m[2][3];
    var c4=m[2][1]*m[3][3]-m[3][1]*m[2][3];
    var c3=m[2][1]*m[3][2]-m[3][1]*m[2][2];
    var c2=m[2][0]*m[3][3]-m[3][0]*m[2][3];
    var c1=m[2][0]*m[3][2]-m[3][0]*m[2][2];
    var c0=m[2][0]*m[3][1]-m[3][0]*m[2][1];

    var det=s0*c5-s1*c4+s2*c3+s3*c2-s4*c1+s5*c0;
    if(det===0)return[["nope"]];
    var invdet=1/det;
    return [
        [( m[1][1]*c5-m[1][2]*c4+m[1][3]*c3)*invdet,
         (-m[0][1]*c5+m[0][2]*c4-m[0][3]*c3)*invdet,
         ( m[3][1]*s5-m[3][2]*s4+m[3][3]*s3)*invdet,
         (-m[2][1]*s5+m[2][2]*s4-m[2][3]*s3)*invdet],

        [(-m[1][0]*c5+m[1][2]*c2-m[1][3]*c1)*invdet,
         ( m[0][0]*c5-m[0][2]*c2+m[0][3]*c1)*invdet,
         (-m[3][0]*s5+m[3][2]*s2-m[3][3]*s1)*invdet,
         ( m[2][0]*s5-m[2][2]*s2+m[2][3]*s1)*invdet],

        [( m[1][0]*c4-m[1][1]*c2+m[1][3]*c0)*invdet,
         (-m[0][0]*c4+m[0][1]*c2-m[0][3]*c0)*invdet,
         ( m[3][0]*s4-m[3][1]*s2+m[3][3]*s0)*invdet,
         (-m[2][0]*s4+m[2][1]*s2-m[2][3]*s0)*invdet],

        [(-m[1][0]*c3+m[1][1]*c1-m[1][2]*c0)*invdet,
         ( m[0][0]*c3-m[0][1]*c1+m[0][2]*c0)*invdet,
         (-m[3][0]*s3+m[3][1]*s1-m[3][2]*s0)*invdet,
         ( m[2][0]*s3-m[2][1]*s1+m[2][2]*s0)*invdet]];
}
