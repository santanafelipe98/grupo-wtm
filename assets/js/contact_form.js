
jQuery(function() {

    function isEmpty(input) {
        return input.val().length === 0 ? 'Campo obrigatório' : undefined
    }

    function isEmail(input) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        return emailRegex.test(input.val()) ? undefined : 'E-mail inválido'
    }

    function isIn(input, values) {
        return values.includes(input.val()) ? undefined : 'Valor inválido'
    }

    function isPhone(input) {
        const regex = /(\([0-9]{2}\)|[0-9]{2})\s?([0-9]\s?)?[0-9]{4}\-?[0-9]{4}/

        return regex.test(input.val()) ? undefined : 'Número de celular inválido'
    }

    function isCpfOrCnpj(input) {
        const onlyNums = input.val().replace(/\D/g, '')

        if (onlyNums.length > 11) {
            if (onlyNums.length === 14)
                return undefined
            else
                return "CNPJ inválido"
        } else {
            if (onlyNums.length === 11)
                return undefined
            else
                return "CPF inválido"
        }
    }


    const fullName      = $('#name')
    const fullNameError = $('#name_error')
    const email         = $('#email')
    const emailError    = $('#email_error')
    const plan          = $('#plan')
    const planError     = $('#plan_error')
    const phone         = $('#phone')
    const phoneError    = $('#phone_error')
    const cpfCnpj       = $('#cpf_cnpj')
    const cpfCnpjError  = $('#cpf_cnpj_error')

    phone.mask('(00) 0 0000-0000')


    const cpfCpnjOptions = {
        onKeyPress: function(val, e, field, options) {
            const masks  = [ '00.000.000/0000-00', '000.000.000-00' ]
            const digits = val.replace(/\D/g, '')
            const mask   = digits > 11 ? masks[0] : masks[1]

            cpfCnpj.mask(mask, options)
        },
        reverse: true
    }
    
    cpfCnpj.mask('00.000.000/0000-00', cpfCpnjOptions)

    let error = false

    function validateName() {
        if (isEmpty(fullName)) {
            let message = isEmpty(fullName)

            fullName.addClass('is-invalid')
            fullNameError.html(message)

            error = true
        } else {
            fullName.removeClass('is-invalid')
            fullNameError.html('')
        }
    }

    function validateEmail() {
        if (isEmpty(email)) {
            let message = isEmpty(email)

            email.addClass('is-invalid')
            emailError.html(message)

            error = true
        } else {
            if (isEmail(email)) {
                let message = isEmail(email)
    
                email.addClass('is-invalid')
                emailError.html(message)
    
                error = true
            } else {
                email.removeClass('is-invalid')
                emailError.html('')
            }
        }
    }

    function validatePlans() {
        const plans = [ 'A', 'B', 'C', 'D' ]
        if (isIn(plan, plans)) {
            let message = isIn(plan, plans)

            plan.addClass('is-invalid')
            planError.html(message)

            error = true
        } else {
            plan.removeClass('is-invalid')
            planError.html('')
        }
    }

    function validatePhone() {
        if (isPhone(phone)) {
            let message = isPhone(phone)

            phone.addClass('is-invalid')
            phoneError.html(message)

            error = true
        } else {
            phone.removeClass('is-invalid')
            phoneError.html('')
        }
    }

    function validateCpfOrCnpj() {
        if (isCpfOrCnpj(cpfCnpj)) {
            let message = isCpfOrCnpj(cpfCnpj)

            cpfCnpj.addClass('is-invalid')
            cpfCnpjError.html(message)

            error = true
        } else {
            cpfCnpj.removeClass('is-invalid')
            cpfCnpjError.html('')
        }
    }
    
    fullName.on('keyup', validateName)
    email.on('keyup', validateEmail)
    email.on('change', validateEmail)
    phone.on('keyup', validatePhone)
    phone.on('change', validatePhone)
    cpfCnpj.on('keyup', validateCpfOrCnpj)


    $('#contato_form').on('submit', function(e) {
        e.preventDefault()

        validateName()
        validateEmail()
        validatePlans()
        validatePhone()
        validateCpfOrCnpj()
    })
})
