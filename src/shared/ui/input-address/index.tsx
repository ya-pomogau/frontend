import React, { useEffect, useMemo, useState } from "react";
import { YMaps, useYMaps } from "@pbe/react-yandex-maps";
import { Input } from "../input";

interface InputAddressProps {
    initialValue: string;
    name: string;
    onChange: (address: string) => void;
    label?: string;
    extClassName?: string;
    error?: boolean;
    errorText?: string;
    customIcon?: React.ReactNode;
    inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>
}

const InputWithSuggest: React.FC<InputAddressProps> = (props) => {
    const { initialValue, onChange, inputAttributes = {}, ...otherProps } = props;
    const [address, setAddress] = useState(initialValue);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ymaps: any = useYMaps(['SuggestView']);
    const id = useMemo(() => `address-${Math.random()}`, []);

    useEffect(() => {
        if (!ymaps) {
            return
        }
        // eslint-disable-next-line no-new
        new ymaps.SuggestView(id);
    }, [ymaps, id]);

    const inputProps = {
        ...inputAttributes,
        ...otherProps,
        id,
        value: address,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setAddress(event.currentTarget.value)
            onChange(event.currentTarget.value)
        },
        placeholder: 'ул. Нахимова, д.9, у подъезда №3',
        type: 'text'
    }


    return (
        <Input {...inputProps} />
    )
}

export const InputAddress: React.FC<InputAddressProps> = (props) =>
    <YMaps enterprise query={{ apikey: 'api-key' }}>
        <InputWithSuggest  {...props} />
    </YMaps>