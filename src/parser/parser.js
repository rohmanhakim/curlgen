export default class Parser {
    parse(url, headers, auth) {
        const curlPrefix = "curl "
        const headersString = this.parseHeader(headers)
        const authString = this.parseAuth(auth)
        const output = curlPrefix + headersString + authString + url
        return output.trim()
    }

    parseAuth(auth) {
        var authString = ''
        switch(auth.type) {
          case 'no-auth':
            break;
          case 'basic':
            authString = `-u ${auth.username}:${auth.password} --basic `
            break;
          case 'digest':
            authString = `-u ${auth.username}:${auth.password} --digest `
            break;
          case 'ntlm':
            authString = `-u ${auth.username}:${auth.password} --ntlm `
            break;
          case 'bearer':
            authString = `-H 'Authorization: Bearer ${auth.token}' `
            break;
          default:
            authString = ''
            break;
        }
        return authString
    }

    parseHeader(headers) {
        return headers.map(header => (
            `-H '${header.key}: ${header.value}' `
        )).join("")
    }
}