import styles from "./RadioGroup.module.css"

export interface IRadioGroups {
    value: string
    items: string[],
    onChange(e: any): void
}

export function RadioGroup({value, items, onChange}: IRadioGroups) {
    return <div className={styles.container}>
        {items.map((item) => (
            <div className={styles.item}>
                <p className={styles.text}>{item}</p>
                <input 
                    className={styles.input}
                    type="radio" 
                    name={item} 
                    value={value} 
                    checked={item === value}
                    onChange={e => onChange(e)}
                />
            </div>
        ))}
    </div>
}