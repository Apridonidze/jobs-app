const CountryCode = ( { setCountryCode, countryCodeRef } ) => {

    const countryCodes = [

        { name: "None", iso: "", code: "", flag: "" },
        { name: "Afghanistan", iso: "af", code: "(+93)", flag: "🇦🇫" },
        { name: "Albania", iso: "al", code: "(+355)", flag: "🇦🇱" },
        { name: "Algeria", iso: "dz", code: "(+213)", flag: "🇩🇿" },
        { name: "Andorra", iso: "ad", code: "(+376)", flag: "🇦🇩" },
        { name: "Angola", iso: "ao", code: "(+244)", flag: "🇦🇴" },
        { name: "Argentina", iso: "ar", code: "(+54)", flag: "🇦🇷" },
        { name: "Armenia", iso: "am", code: "(+374)", flag: "🇦🇲" },
        { name: "Australia", iso: "au", code: "(+61)", flag: "🇦🇺" },
        { name: "Austria", iso: "at", code: "(+43)", flag: "🇦🇹" },
        { name: "Azerbaijan", iso: "az", code: "(+994)", flag: "🇦🇿" },
        { name: "Bahamas", iso: "bs", code: "(+1-242)", flag: "🇧🇸" },
        { name: "Bahrain", iso: "bh", code: "(+973)", flag: "🇧🇭" },
        { name: "Bangladesh", iso: "bd", code: "(+880)", flag: "🇧🇩" },
        { name: "Belarus", iso: "by", code: "(+375)", flag: "🇧🇾" },
        { name: "Belgium", iso: "be", code: "(+32)", flag: "🇧🇪" },
        { name: "Belize", iso: "bz", code: "(+501)", flag: "🇧🇿" },
        { name: "Benin", iso: "bj", code: "(+229)", flag: "" },
        { name: "Bhutan", iso: "bt", code: "(+975)", flag: "🇧🇹" },
        { name: "Bolivia", iso: "bo", code: "(+591)", flag: "🇧🇴" },
        { name: "Bosnia and Herzegovina", iso: "ba", code: "(+387)", flag: "🇧🇦" },
        { name: "Brazil", iso: "br", code: "(+55)", flag: "🇧🇷" },
        { name: "Bulgaria", iso: "bg", code: "(+359)", flag: "🇧🇬" },
        { name: "Canada", iso: "ca", code: "(+1)", flag: "🇨🇦" },
        { name: "China", iso: "cn", code: "(+86)", flag: "🇨🇳" },
        { name: "France", iso: "fr", code: "(+33)", flag: "🇫🇷" },
        { name: "Germany", iso: "de", code: "(+49)", flag: "🇩🇪" },
        { name: "Georgia", iso: "ge", code: "(+995)", flag: "🇬🇪" },
        { name: "India", iso: "in", code: "(+91)", flag: "🇮🇳" },
        { name: "United Kingdom", iso: "gb", code: "(+44)", flag: "🇬🇧" },
        { name: "United States", iso: "us", code: "(+1)", flag: "🇺🇸" }

    ]; //list for country codes 

    return(
            <select className="form-control" onChange={(e) => setCountryCode(e.target.value)} ref={countryCodeRef}>
                {countryCodes.map((code,codeId) => (
                    <option key={codeId}>{code.code} {code.iso} {code.name} {code.flag}</option>
                ))}
            </select>
    );
};//component maps country codes and represent them as an option

export default CountryCode; //exporting component