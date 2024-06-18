import clsx from 'clsx'; // Тут тоже используем библеотеку clsx

import { useState, FormEvent } from 'react'; // Воспользуемся хуками
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select'; // Добавим компонент выпадающего списка
import { Text } from '../text'; // Добавим компонент для отображения текста
import { Separator } from '../separator'; // Добавим компонент для рендеринга
import { RadioGroup } from '../radio-group'; // Добавим компонент для отображения кнопок
import {
	OptionType,
	ArticleStateType,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps'; // Накидываем настройки интерфейса

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProp = {
	setArticle: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticle }: ArticleParamsFormProp) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticle(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		setArticle(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isActive={isOpened}
				onClick={() => setIsOpened((currentIsOpened) => !currentIsOpened)}
			/>

			<div
				onClick={() => setIsOpened(false)}
				className={clsx(styles.overlay, isOpened && styles.overlay_open)}></div>

			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
