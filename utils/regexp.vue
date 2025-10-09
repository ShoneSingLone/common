<script lang="ts">
export default async function () {
	/**
	 * CIDR校验工具，用于验证IPv4 CIDR地址的合法性
	 */
	class CIDRValidator {
		/**
		 * 校验CIDR是否合法
		 * @param {string} cidr - 待校验的CIDR字符串，格式如"192.168.1.0/24"
		 * @returns {Object} 校验结果，包含是否合法及相关信息
		 */
		validate(cidr) {
			// 步骤1: 检查基本格式
			const formatResult = this.checkFormat(cidr);
			if (!formatResult.valid) {
				return formatResult;
			}

			const { ip, prefix } = formatResult;

			// 步骤2: 检查IP地址各段是否合法
			const ipSegments = ip.split(".").map(Number);
			const ipResult = this.checkIpSegments(ipSegments);
			if (!ipResult.valid) {
				return ipResult;
			}

			// 步骤3: 检查前缀长度是否合法
			const prefixResult = this.checkPrefix(prefix);
			if (!prefixResult.valid) {
				return prefixResult;
			}

			// 步骤4: 检查网络位与主机位是否合法
			const networkResult = this.checkNetworkHostBits(ipSegments, prefix);
			if (!networkResult.valid) {
				return networkResult;
			}

			// 所有检查通过，返回详细信息
			return {
				valid: true,
				ip,
				prefix,
				subnetMask: this.calculateSubnetMask(prefix),
				networkAddress: this.calculateNetworkAddress(ipSegments, prefix),
				broadcastAddress: this.calculateBroadcastAddress(ipSegments, prefix),
				message: "CIDR地址合法"
			};
		}

		/**
		 * 检查CIDR的基本格式
		 * @param {string} cidr - 待校验的CIDR字符串
		 * @returns {Object} 格式检查结果
		 */
		checkFormat(cidr) {
			// 基本格式正则: 四组数字.四组数字.四组数字.四组数字/前缀
			const cidrRegex = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;

			if (!cidrRegex.test(cidr)) {
				return {
					valid: false,
					message: 'CIDR格式不正确，正确格式应为"x.x.x.x/y"，如"192.168.1.0/24"'
				};
			}

			// 分割IP和前缀
			const [ip, prefixStr] = cidr.split("/");
			const prefix = parseInt(prefixStr, 10);

			// 检查IP部分是否有前导零（0除外）
			const ipSegments = ip.split(".");
			for (const segment of ipSegments) {
				if (segment.length > 1 && segment.startsWith("0")) {
					return {
						valid: false,
						message: `IP地址包含无效的前导零: ${segment}`
					};
				}
			}

			return {
				valid: true,
				ip,
				prefix
			};
		}

		/**
		 * 检查IP地址各段是否在合法范围内
		 * @param {number[]} segments - IP地址的四个段
		 * @returns {Object} 检查结果
		 */
		checkIpSegments(segments) {
			if (segments.length !== 4) {
				return {
					valid: false,
					message: "IP地址必须包含4个段"
				};
			}

			for (let i = 0; i < 4; i++) {
				const segment = segments[i];
				if (isNaN(segment) || segment < 0 || segment > 255) {
					return {
						valid: false,
						message: `IP地址第${i + 1}段(${segment})无效，必须在0-255之间`
					};
				}
			}

			return { valid: true };
		}

		/**
		 * 检查前缀长度是否合法
		 * @param {number} prefix - 前缀长度
		 * @returns {Object} 检查结果
		 */
		checkPrefix(prefix) {
			if (isNaN(prefix) || prefix < 0 || prefix > 32) {
				return {
					valid: false,
					message: `前缀长度(${prefix})无效，IPv4的前缀长度必须在0-32之间`
				};
			}
			return { valid: true };
		}

		/**
		 * 检查网络位与主机位是否合法
		 * @param {number[]} ipSegments - IP地址的四个段
		 * @param {number} prefix - 前缀长度
		 * @returns {Object} 检查结果
		 */
		checkNetworkHostBits(ipSegments, prefix) {
			// 对于/32前缀，主机位为0，任何IP都是合法的
			if (prefix === 32) {
				return { valid: true };
			}

			// 对于/0前缀，只有0.0.0.0/0是合法的
			if (prefix === 0) {
				if (ipSegments.join(".") === "0.0.0.0") {
					return { valid: true };
				} else {
					return {
						valid: false,
						message: "前缀为0时，IP地址必须是0.0.0.0"
					};
				}
			}

			// 计算网络地址
			const networkAddress = this.calculateNetworkAddress(ipSegments, prefix);
			const originalIp = ipSegments.join(".");

			if (networkAddress !== originalIp) {
				return {
					valid: false,
					message: `IP地址的主机位必须全为0，正确的网络地址应为${networkAddress}`
				};
			}

			return { valid: true };
		}

		/**
		 * 计算子网掩码
		 * @param {number} prefix - 前缀长度
		 * @returns {string} 子网掩码字符串
		 */
		calculateSubnetMask(prefix) {
			// 创建32位的子网掩码二进制数组
			const maskBits = new Array(32).fill(0).map((_, i) => (i < prefix ? 1 : 0));

			// 分成4个字节并转换为十进制
			const octets = [];
			for (let i = 0; i < 4; i++) {
				const start = i * 8;
				const end = start + 8;
				const bits = maskBits.slice(start, end).join("");
				octets.push(parseInt(bits, 2));
			}

			return octets.join(".");
		}

		/**
		 * 计算网络地址
		 * @param {number[]} ipSegments - IP地址的四个段
		 * @param {number} prefix - 前缀长度
		 * @returns {string} 网络地址字符串
		 */
		calculateNetworkAddress(ipSegments, prefix) {
			// 将IP转换为32位二进制
			const ipBits = [];
			for (const segment of ipSegments) {
				// 转换为8位二进制，不足8位前面补0
				const bits = segment.toString(2).padStart(8, "0");
				ipBits.push(...bits.split("").map(Number));
			}

			// 将主机位设为0
			for (let i = prefix; i < 32; i++) {
				ipBits[i] = 0;
			}

			// 转换回四段十进制格式
			const octets = [];
			for (let i = 0; i < 4; i++) {
				const start = i * 8;
				const end = start + 8;
				const bits = ipBits.slice(start, end).join("");
				octets.push(parseInt(bits, 2));
			}

			return octets.join(".");
		}

		/**
		 * 计算广播地址
		 * @param {number[]} ipSegments - IP地址的四个段
		 * @param {number} prefix - 前缀长度
		 * @returns {string} 广播地址字符串
		 */
		calculateBroadcastAddress(ipSegments, prefix) {
			// 对于/32前缀，广播地址就是IP本身
			if (prefix === 32) {
				return ipSegments.join(".");
			}

			// 将IP转换为32位二进制
			const ipBits = [];
			for (const segment of ipSegments) {
				const bits = segment.toString(2).padStart(8, "0");
				ipBits.push(...bits.split("").map(Number));
			}

			// 将主机位设为1
			for (let i = prefix; i < 32; i++) {
				ipBits[i] = 1;
			}

			// 转换回四段十进制格式
			const octets = [];
			for (let i = 0; i < 4; i++) {
				const start = i * 8;
				const end = start + 8;
				const bits = ipBits.slice(start, end).join("");
				octets.push(parseInt(bits, 2));
			}

			return octets.join(".");
		}

		/**
		 * 判断IP是否为私有地址
		 * @param {string} ip - IP地址
		 * @returns {boolean} 是否为私有地址
		 */
		isPrivateIp(ip) {
			const segments = ip.split(".").map(Number);

			// 10.0.0.0/8 私有网段
			if (segments[0] === 10) {
				return true;
			}

			// 172.16.0.0/12 私有网段 (172.16.0.0 - 172.31.255.255)
			if (segments[0] === 172 && segments[1] >= 16 && segments[1] <= 31) {
				return true;
			}

			// 192.168.0.0/16 私有网段
			if (segments[0] === 192 && segments[1] === 168) {
				return true;
			}

			return false;
		}
	}

	if (!window._reg) {
		const validator_cidr = new CIDRValidator();

		window._reg = {
			validator_cidr,
			serviceName: () => /^[^\d][a-z0-9-]{0,62}[a-z0-9]$/,
			email: () => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			mobile: () => /^1[34578]\d{9}$/,
			/**
			 * 以字母或者数字开头和结尾，由字母、数字连接符(-)、下划线(_)、点号(.)组成
			 */
			keyVal: () => /^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]$/,
			keyValOnlyOne: () => /^[a-zA-Z0-9]$/,
			imageDesRe: "/^(?!\\s)[^<>]*$/",
			ipv4Reg: () =>
				/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)$/i,
			ipv4CidrReg: () =>
				/^([0-9]|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))(\.([0-9]|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))){3}\/(([0-2]\d?)|(3[0-2]?)|([4-9]?))$/,
			ipv4WithZeroReg:
				/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)$/i,
			digitReg: "(0|[1-9][0-9]*)(-(0|[1-9][0-9]*))?",
			ipv4SegReg:
				/^(([1-9]|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))(\.([0-9]|([1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))){3})$/,
			port: () =>
				/^([1-9]|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
			rulePath: /^([\/][~';@\w-/.%?,#&=^$*+!:|\\\(\)\[\]\{\}]*)*$/,
			rulePathByRegex: /^[~';@\w-/.%?,#&=^$*+!:|\\\(\)\[\]\{\}]*$/,
			ruleHost: /^(?=^.{1,100}$)[a-zA-Z\d.\-?=~_+\\\^*!$&|\(\)\[\]]*$/,
			hostThenReg:
				/^(?=^.*$)[a-zA-Z0-9](?:[-a-zA-Z0-9]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-a-zA-Z0-9]*[a-zA-Z0-9])?)+$/,
			hostReg:
				/^(?=^.*$)((\*)|([a-zA-Z0-9])(?:[-a-zA-Z0-9]*[a-zA-Z0-9])?)(?:\.[a-zA-Z0-9](?:[-a-zA-Z0-9]*[a-zA-Z0-9])?)+$/,
			printHeaderValueReg: /^[a-zA-Z0-9!#$%&'()*+,.\/:;<=>?@\[\]\\^_`{|}~-]*$/,
			printPartReg: /^[a-zA-Z0-9!$'\/()*+,.:;=?@^_`-]*$/,
			printMessageBodyReg: /^[a-zA-Z0-9\u4e00-\u9fa5!"#$%&'()*+,.\/:;<=>?@\[\]\\ ^_`{|}~-]*$/,
			printQueryPartReg: /^([a-zA-Z0-9!$'()*+,.\/:;=?@&^_`-]|(\${query}))*$/,
			headerKeyReg: /^[a-zA-Z0-9-_]*$/,
			urlPathReg: () => /^(\/([a-zA-Z0-9-._~!$&amp;\'()*+,;=:@%]|(%[a-fA-F0-9]{2}))*)+$/,
			/**
			 * 以/开头，由英文字母、数字或特殊字符-/.%?#&=组成
			 */
			url1: () => /^(\/([a-zA-Z0-9-\/.&amp;:?#=%]|(%[a-fA-F0-9]{2}))*)+$/,
			/**
			 * URL只能以/开头，由英文字母、数字或特殊字符_~`;@^-%#&$.*+?,=!:|V()[]{}组成
			 */
			url2: () =>
				/^(\/([a-zA-Z0-9-._~!$&amp;\')(}{*\[\]+,;=:@%#^?`\|]|(%[a-fA-F0-9]{2}))*)+$/,
			sharedUrlPathReg: /^(\/([a-zA-Z0-9-/.%?&amp_]|(%[a-fA-F0-9]{2}))*)+$/,
			guaranteedUrlPathReg:
				/^(\/([a-zA-Z0-9-._~!$&amp;\'()*\[\]+,;=:@%#^?]|(%[a-fA-F0-9]{2}))*)+$/,
			nameReg: "^[\\u4e00-\\u9fa5]$",
			priorityReg: /^((?!0)\d{1,2}|100)$/,
			idReg: /^[0-9a-z]{8}-([0-9a-z]{4}-){3}[0-9a-z]{12}$/,
			integerReg: () => /^(0?|-?[1-9]\d*)$/,
			httpCodeReg: "^[2-5]\\d\\d(-[2-5]\\d\\d)?$",
			dscpReg: /^([1-9]|[1-5]\d{1}|6[0-3])$/,
			userDefinedHeaderValueReg: /^[\x21-\x7E]+$/,
			refrenceHeaderValueReg: /^[a-z0-9-_]*$/,
			cookieKeyReg: /^[a-zA-Z0-9\!\"\%\'\(\)\*\+\,\-\.\/\:\=\?\@\^\_\`\~]*$/,
			nameRe: "/^[a-zA-Z0-9_]*$/",
			ChineseRe: "[\\u4e00-\\u9fa5a-zA-Z0-9-_.]*",
			NatNameRe: "[\\u4e00-\\u9fa5a-zA-Z0-9-_]*",
			ChineseNotHyphensRe: "[\\u4e00-\\u9fa5a-zA-Z0-9-_]*",
			extendName: "/^(?!\\s)(?!.*?\\s$)[a-zA-Z0-9_.\\-\\s]*$/",
			desRe: "^[^<>]*$",
			imageName: "/^(?!\\s)(?!.*?\\s$)[a-zA-Z0-9_.\\-\\s]{1,128}$/",
			notEmpty: "/^[\\S]*$/",
			VolumenameRe: "^[a-zA-Z0-9_]*$",
			unixFilePathName: "/^(/\\w+)+(\\.\\w+)?$/",
			winFilePathName: "/^[a-zA-Z]:(\\\\\\w+)+(\\.\\w+)?$/",
			letterNumber: "/^[a-zA-Z0-9]+$/",
			// phoneRe: () => /((d{11})|^((d{7,8})|(d{4}|d{3})-(d{7,8})|(d{4}|d{3})-(d{7,8})-(d{4}|d{3}|d{2}|d{1})|(d{7,8})-(d{4}|d{3}|d{2}|d{1}))$)/,
			phoneRe: () => /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
			macRe: "^[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}$",
			notAllSpaceReg: "/^.*[^ ].*$/",
			/**
			 * 只返回数字
			 * @return {RegExp}
			 */
			notAllNumReg: () => /^[0-9]*$/,
			spaceReg: /\s+/,
			domainIDReg: /^[a-zA-Z0-9-]{1,64}$/,
			hostRegWaf:
				/^(?=^.{3,255}$)[*a-zA-Z0-9][-_a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-_a-zA-Z0-9]{0,62})+$|^\*$/,
			domainName:
				"(^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[-a-zA-Z0-9]{1,63})*(.[-a-zA-Z0-9]{0,62}[a-zA-Z0-9])$)|(^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$)|(^[a-zA-Z0-9]$)",
			domainReg: () =>
				/^(?=^.{3,100}$)[a-zA-Z0-9](?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?)+$/,
			domainRegWildCard:
				/^(?=^.{1,100}$)[a-zA-Z\d\*\?\-=~_+\\\^!$&|\(\)\[\]]((?!.*\.\.)[a-zA-Z\d\*\?\-\.=~_+\\\^!$&|\(\)\[\]]*[a-zA-Z\d\*\?\-=~_+\\\^!$&|\(\)\[\]])?$/,
			domainNew:
				/^(?=^.{3,100}$)((\*)|((\*)[a-zA-Z0-9])|([a-zA-Z0-9]))(?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?)+$/,
			dnsSearchDomainNew:
				/^(?=^.{3,254}$)((\*)|((\*)[a-zA-Z0-9])|([a-zA-Z0-9]))(?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?)+$/,
			multiDomainNew:
				/^(?=^.{3,1024}$)(((\*)|((\*)[a-zA-Z0-9])|([a-zA-Z0-9]))(?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?)+)(\,((\*)|((\*)[a-zA-Z0-9])|([a-zA-Z0-9]))(?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?)+){0,29}$/,
			upLinkPort: "((^([0-9])+/([0-9])+/([0-9])+(,(([0-9])+/([0-9])+/([0-9])+))*$)|(^$))",
			ipv6Reg:
				/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
			projectId: /^[0-9a-z]{32}$/,
			cifsDirReg:
				/^((\\\\(([1-9]|[1-9]\d|(10|11)\d|12[0-6]|12[8-9]|1[3-9]\d|2[0-1]\d|22[0-3])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3})){1})((((\\){1})([a-zA-Z0-9-_ .]{1,})){1,})$/,
			nfsDirReg:
				/^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}:\/[\S.]+$/,
			DeviceName: "(^/dev/xvd)[e-z]{1}$",
			DeviceNameRe: "/(^/dev/xvd)[e-z]{1}$/",
			tenantIdReg: /^[0-9a-z]{32}$/,
			uuidReg: /^[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}$/,
			containUuidReg: /[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}/g,
			maskReg: "^([0-9]|[1-2][0-9]|3[0-2])$",
			maskIpv6Reg: "^([0-9]|[1-9][0-9]|1[0-2][0-8])$",
			tenantNameValid: "/^[A-Za-z-\\s][A-Za-z0-9_-\\s]*$/",
			pskofVPNReg: /^[^<>&?*'"\s]+$/,
			projectNameValid: "/^[A-Za-z_-][A-Za-z0-9_-\\s]*$/",
			cidrRangeReg:
				/^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\/([1-9]|[1-2]\d|3[0-2])\~([1-9]|[1-2]\d|3[0-2])$/,
			DCRe: "[a-zA-Z0-9-_]*",
			certContent:
				"[-]{5}BEGIN[^<>-]+[-]{5}(\r)?\n([^-<> \f\n\r\t\v]+(\r)?\n{1})+[-]{5}END[^<>-]+[-]{5}",
			privateKeyContent:
				"([-]{5}BEGIN[^<>-]+[-]{5}(\r)?\n([^-<> \f\n\r\t\v]+(\r)?\n{1})+[-]{5}END[^<>-]+[-]{5}(\r)?\n)?[-]{5}BEGIN[^<>-]+[-]{5}(\r)?\n([^-<> \f\n\r\t\v]+(\r)?\n{1})+[-]{5}END[^<>-]+[-]{5}",
			/**
			 * 工作负载名称校验
			 * workloadName: /^[a-z]([-a-z0-9]*[a-z0-9])?$/
			 * @returns {RegExp}
			 */
			workloadName: () => /^[a-z]([-a-z0-9]*[a-z0-9])?$/,
			/**
			 * 端口名称校验
			 */
			scRancherPortName: () => /^(?=.*\d)(?=.*[a-zA-Z])/,
			/**
			 * 环境变量名称校验
			 */
			scEnvName: () => /[-._a-zA-Z][-._a-zA-Z0-9]*'/
		};
	}
	return window._reg;
}
</script>
