import { glContext } from '../renderer/renderer.js';

class Texture {
	constructor() {
		const gl = glContext();
		this._textureSource = null;
		this._textureId = gl.createTexture();
	}

	createTexture(image) {
		const gl = glContext();
		this._level = 0;
	  this._internalFormat = gl.RGBA4;
	  this._width = image.width;
	  this._height = image.height;
	  this._border = 0;
	  this._format = gl.RGBA;
	  this._dataType = gl.UNSIGNED_BYTE;
	  this._data = image.data;

	 	this.bind();
		gl.texImage2D(gl.TEXTURE_2D, this._level, this._internalFormat,
		          this._width, this._height, this._border, this._format, this._dataType,
		          this._data);

	  if (Texture.isPowerOf2(this._width) && Texture.isPowerOf2(this._height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // No, it's not a power of 2. Turn of mips and set
      // wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
	}

	bind() {
		const gl = glContext();
		gl.bindTexture(gl.TEXTURE_2D, this._textureId);
	}

	static isPowerOf2(value) {
		return (value & (value - 1)) == 0;
	}
};

export default Texture;