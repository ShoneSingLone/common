<script lang="ts">
export default async function () {
	/**
	 * Web Crypto API RSA 加密解密工具
	 */
	class CryptoUtils {
		/**
		 * 字符串转 ArrayBuffer
		 * @param {string} str - 字符串
		 * @returns {ArrayBuffer} - 转换后的 ArrayBuffer
		 */
		static _str2ab(str) {
			const buf = new ArrayBuffer(str.length);
			const bufView = new Uint8Array(buf);
			for (let i = 0, strLen = str.length; i < strLen; i++) {
				bufView[i] = str.charCodeAt(i);
			}
			return buf;
		}

		/**
		 * 生成 RSA 密钥对
		 * @returns {Promise<{privateKey: JsonWebKey, publicKey: JsonWebKey}>}
		 */
		static async generateKeyPair() {
			const keyPair = await window.crypto.subtle.generateKey(
				{
					name: "RSA-OAEP",
					modulusLength: 2048,
					publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
					hash: "SHA-256"
				},
				true,
				["encrypt", "decrypt"]
			);

			const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
			const privateKey = await window.crypto.subtle.exportKey("spki", keyPair.privateKey);

			return { publicKey, privateKey };
		}
		static async PublicKeyFromPem(pemKey) {
			// 移除 PEM 头和尾标记
			const pemWithoutHeaders = pemKey
				.replace("-----BEGIN PUBLIC KEY-----", "")
				.replace("-----END PUBLIC KEY-----", "")
				.replace(/\s/g, ""); // 移除所有空白字符

			// 解码 Base64
			const binaryDerString = atob(pemWithoutHeaders);
			const binaryDer = this._str2ab(binaryDerString);

			return binaryDer;
		}

		/**
		 * 使用公钥加密文本
		 * @param {string} plaintext - 待加密的文本
		 * @param {JsonWebKey} publicKey - 公钥 (spki 格式)
		 * @returns {Promise<string>} - 加密后的 Base64 字符串
		 */
		static async encrypt(plaintext, publicKey) {
			const importedKey = await window.crypto.subtle.importKey(
				"spki",
				publicKey,
				{
					name: "RSA-OAEP",
					hash: "SHA-256"
				},
				false,
				["encrypt"]
			);

			const encoder = new TextEncoder();
			const data = encoder.encode(plaintext);

			const encrypted = await window.crypto.subtle.encrypt(
				{
					name: "RSA-OAEP"
				},
				importedKey,
				data
			);

			return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
		}

		/**
		 * 使用私钥解密文本
		 * @param {string} ciphertext - 待解密的 Base64 字符串
		 * @param {JsonWebKey} privateKey - 私钥 (spki 格式)
		 * @returns {Promise<string>} - 解密后的明文
		 */
		static async decrypt(ciphertext, privateKey) {
			const importedKey = await window.crypto.subtle.importKey(
				"spki",
				privateKey,
				{
					name: "RSA-OAEP",
					hash: "SHA-256"
				},
				false,
				["decrypt"]
			);

			const binaryString = atob(ciphertext);
			const data = Uint8Array.from(binaryString, c => c.charCodeAt(0));

			const decrypted = await window.crypto.subtle.decrypt(
				{
					name: "RSA-OAEP"
				},
				importedKey,
				data
			);

			const decoder = new TextDecoder();
			return decoder.decode(decrypted);
		}
	}

	return { CryptoUtils };
}
</script>
