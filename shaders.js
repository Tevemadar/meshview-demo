function buildprogram(gl,vsrc,fsrc){
    var vs=gl.createShader(gl.VERTEX_SHADER);
    var fs=gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vs,vsrc);
    gl.shaderSource(fs,fsrc);
    gl.compileShader(vs);
    gl.compileShader(fs);
    prg=gl.createProgram();
    gl.attachShader(prg, vs);
    gl.attachShader(prg, fs);
    gl.linkProgram(prg);
    return prg;
}
function buildshaders(gl){
    return {
        solidcloud:buildprogram(gl,
            "attribute vec3 coords;"+

            "uniform mat4 alltrf;"+

            "void main(void)"+
            "{"+
            "    gl_Position = vec4(coords, 1.)*alltrf;"+
            "    gl_PointSize = 2.0;"+
            "}",

            "precision highp float;"+
            "uniform vec3 color;"+
            "void main(void)"+
            "{"+
            "    gl_FragColor=vec4(color,1.);"+
            "}"
        ),
        cutcloud:buildprogram(gl,
            "attribute vec3 coords;"+

            "uniform mat4 alltrf;"+

            "uniform vec3 cutbase;"+
            "uniform vec3 cutnormal;"+

            "varying float height;"+
            "void main(void)"+
            "{"+
            "    height=dot(cutbase-coords,cutnormal);"+
            "    gl_Position = vec4(coords, 1.)*alltrf;"+
            "    gl_PointSize = 2.0;"+
            "}",

            "precision highp float;"+
            "uniform vec3 color;"+
            "varying float height;"+
            "void main(void)"+
            "{"+
            "    if(height>=0.)discard;"+
            "    gl_FragColor=vec4(color,1.);"+
            "}"
        ),
        solidmesh:buildprogram(gl,
            "attribute vec3 coords;"+
            "attribute vec3 normals;"+

            "uniform mat4 normtrf;"+
            "uniform mat4 alltrf;"+

            "varying vec4 norm4;"+
            "void main(void)"+
            "{"+
            "    norm4=vec4(normals,1.)*normtrf;"+
            "    gl_Position = vec4(coords, 1.)*alltrf;"+
            "}",

            "precision highp float;"+
            "uniform vec3 color;"+
            "varying vec4 norm4;"+
            "void main(void)"+
            "{"+
            "    float n=abs(normalize(norm4).z);"+
            "    gl_FragColor=vec4(color*n,1.);"+
            "}"
        ),
        cutmesh:buildprogram(gl,
            "attribute vec3 coords;"+
            "attribute vec3 normals;"+

            "uniform mat4 normtrf;"+
            "uniform mat4 alltrf;"+
            
            "uniform vec3 cutbase;"+
            "uniform vec3 cutnormal;"+

            "varying vec4 norm4;"+
            "varying float height;"+
            "void main(void)"+
            "{"+
            "    norm4=vec4(normals,1.)*normtrf;"+
            "    height=dot(cutbase-coords,cutnormal);"+
            "    gl_Position = vec4(coords, 1.)*alltrf;"+
            "}",

            "precision highp float;"+
            "uniform vec3 color;"+
            "varying vec4 norm4;"+
            "varying float height;"+
            "void main(void)"+
            "{"+
            "    if(height<=0.)discard;"+
            "    float n=abs(normalize(norm4).z);"+
            "    gl_FragColor=vec4(color*n,1.);"+
            "}"
        ),
        cutsurface:buildprogram(gl,
            "attribute vec3 coords;"+
//            "attribute vec3 normals;"+

            "uniform mat4 alltrf;"+
            
            "uniform vec3 cutbase;"+
            "uniform vec3 cutnormal;"+

            "varying float height;"+
            "void main(void)"+
            "{"+
            "    height=dot(cutbase-coords,cutnormal);"+
            "    gl_Position = vec4(coords, 1.)*alltrf;"+
            "}",

            "precision highp float;"+
            "uniform vec3 color;"+
            "varying float height;"+
            "void main(void)"+
            "{"+
            "    if(height<=0.)discard;"+
            "    gl_FragColor=vec4(color,1.);"+
            "}"
        ),
        ghostmesh:buildprogram(gl,
            "attribute vec3 coords;"+
            "attribute vec3 normals;"+

            "uniform mat4 normtrf;"+
            "uniform mat4 alltrf;"+

            "varying vec4 norm4;"+
            "void main(void)"+
            "{"+
            "    norm4=vec4(normals,1.)*normtrf;"+
            "    gl_Position = vec4(coords, 1.)*alltrf;"+
            "}",

            "precision highp float;"+
            "uniform vec3 color;"+
            "varying vec4 norm4;"+
            "void main(void)"+
            "{"+
            "    float n=abs(normalize(norm4).z);"+
//            "    gl_FragColor=vec4(color*n*(1.-n),1.-n);"+
//            "    gl_FragColor=vec4(color*n,1.-n);"+
            "    gl_FragColor=vec4(color*n*0.3,0.3);"+
            "}"
        )
    };
}