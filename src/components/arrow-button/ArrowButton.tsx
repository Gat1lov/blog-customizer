import clsx from 'clsx'; // Используем библеотеку clsx

import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
	isActive: boolean; // Указываем активная ли кнопка или нет
	onClick: () => void; // Обработчик клика
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const { onClick, isActive } = props;
	return (
		<div
			role='button'
			onClick={() => onClick()}
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isActive && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isActive && styles.arrow_open)}
			/>
		</div>
	);
};
