curl -X GET -G \
  'https://api.foursquare.com/v2/venues/explore' \
    -d client_id="CRPNQZKLQSLFOOPWSUQS3BBYIMZS01RIR22KIGNMYP2LSHI2" \
    -d client_secret="HR2WRPIRAHBKOMJKAXAZ2CKNUDUZJMWDPX1A0THJSTCTYMR4" \
    -d v="20180323" \
    -d ll="35.9709,-83.9173" \
    -d query="pizza" \
    -d limit=1