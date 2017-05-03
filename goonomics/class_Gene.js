/**
 * class Gene
 * @author Justen Robertson <justen@justenrobertson.com>
 * @link http://www.justenrobertson.com
 * @copyright 2009 Justen Robertson
 * @license Creative Commons BY-NC-SA http://creativecommons.org/licenses/by-nc-sa/2.0/
 * @see Transocoder, Genome
 *
 * A gene encoded in binary with a few methods for ease of use. The codon length
 * of a binary gene is 8 bits, so that 1 codon = 1 byte. 1 codon = 2 hex digits
 * The end codon is determined by the Encoder object, while
 * the begin code is determined by the 'physics' - i.e. the script. Begin
 * codes will generally be 1 codon, so the first codon is the alpha (the
 * descriptor) and the last being the omega(stop codon). Thus the minimum length
 * of a gene is 1+1+1 = 3 codons = 3 bytes = 6 hex, though this may vary.
 *
 * Typically the functional portion of a gene is directly translated to a decimal
 * factor.
 *
 * The whole genetics system is managed by three objects: the transcoder which
 * is used during gene copying, the genome which manages the creature's genotype,
 * and the gene objects which are collected by the genome. The transcoder is
 * responsible for copying and applying insertions and deletions while the
 * genome is responsible for managing gene collections and interpreting them.
 */

function Gene(code) {
	this.code = code?this.parse(code):this.parse(hex2bin('ff0100'));

	this.asBin = function() {
		return code;
	}

	this.asHex = function() {
		return bin2hex(code);
	}

	this.express = function() {
		return bin2dec(code);
	}
}




/**
 * class Genome
 * @author Justen Robertson <justen@justenrobertson.com>
 * @link http://www.justenrobertson.com
 * @copyright 2009 Justen Robertson
 * @license Creative Commons BY-NC-SA http://creativecommons.org/licenses/by-nc-sa/2.0/
 * @see Transocoder, Gene
 * 
 * This object is a collection of plasmids. It provides interpretation and storage
 * functions. It is copied by a Transcoder.
 *
 * @property plasmid The genes are stored in plasmids, which are analogous to
 * chromosomes (in fact the name for some kinds of bacterial chromosomes). Each
 * plasmid has its own identifier, so this.plasmids is an object.
 */

function Genome() {
	this.plasmids = {};
}




/**
 * class Plasmid
 * @author Justen Robertson <justen@justenrobertson.com>
 * @link http://www.justenrobertson.com
 * @copyright 2009 Justen Robertson
 * @license Creative Commons BY-NC-SA http://creativecommons.org/licenses/by-nc-sa/2.0/
 * @see Transocoder, Gene
 * 
 * This object is a single gene collection, part of a set describing an artificial
 * creature.
 */

function Plasmid() {
	this.genes = [];

	this.toString = function() {
		var string = '';
		this.genes.each(function(gene) {
			string += gene.code;
		});
		return string;
	}
}




/**
 * class Transcoder
 *
 * This object performs transcoding functions by reading out gene plasmids into
 * binary code, then using regular expressions to find and copy over genes.
 */

function Transcoder(params) {
	this.alpha = '00000000'; // the alpha is the start codon, it'll be read in sequence
	this.omega = params.omega?params.omega:'00000000'; // this is the stop codon, it's universal

	


	/**
	 * transcodes an entire genome into a new one, returning the result
	 */
	this.transcode = function(genome) {
		var code = '';
		genome.plasmids.each(function(p) {
			var code = p.toString();
		});
	}
}