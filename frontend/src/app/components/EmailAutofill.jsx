import {useState} from "react";

export default function EmailAutofill()
{
    const emails = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'aol.com',
        'msn.com',
        'comcast.net',
        'outlook.com',
        'verizon.net',
        'sky.com',
        'icloud.com',
        'centurylink.net',
        'frontier.com',
        't-mobile.com'
    ]
    
    const [suggestedEmails, setSuggestedEmails] = useState([])
    
    return (
        <div className={"flex flex-col relative"}>
            <input type={"text"} className={"p-1 border border-1 border-gray-400 rounded"} onChange={(e) => handleChange(e, setSuggestedEmails, emails)} />
            <div className={"flex flex-col absolute top-12 w-full border border-1 border-gray-400 rounded " + (suggestedEmails.length >= 1 ? '' : 'hidden')}>
                {suggestedEmails.map((email) => (
                    <span key={email}>
                        {email}
                    </span>
                ))}
            </div>
        </div>
    )
}

const handleChange = (event, setSuggestedEmails, emails) => {
    let input = event.target.value
    
    if(!input.includes('@') || input.length <= 1) {
        setSuggestedEmails([])
        return;
    }
    
    // TODO Eventually, if comma entered, submit the email address if it is valid
    // TODO Also submit email address on press enter key or select email from dropdown
    // TODO When email from dropdown is clicked, replace all chars after @ symbol with selected email extension
    // TODO Eventually, allow user to navigate with arrow keys on dropdown to select a value, and press enter to select
    
    input = input.substring(input.indexOf("@") + 1)
    
    setSuggestedEmails(() => {
        return emails.filter((email) => {
            return email.startsWith(input)
        })
    })
}