export interface BodyBotiDto {
    chatPlatform: string,
    chatChannelNumber: string,
    platformContactId: string,
    ruleNameOrId: string,
    clientPayload: string,
    params: {
      auxiliar: string, 
      auxiliar1: string,
      auxiliar2: string,
      auxiliar3: string,
      auxiliar4: string,
      auxiliar5: string,
      auxiliar6: string
    }
}